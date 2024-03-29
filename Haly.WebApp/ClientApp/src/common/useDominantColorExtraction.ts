import { extend } from "colord";
import lab from "colord/plugins/lab";
import { useAtom } from "jotai";
import { PaletteColor, paletteFromImage } from "palette-from-image";
import { useCallback, useRef } from "react";

import { PlaylistWithTracksDto } from "../../generated/haly";
import { dominantColorsAtom } from "./atoms/pageAtoms";
import { theme } from "./theme";

extend([lab]);

function useDominantColorExtraction(imageUrl: PlaylistWithTracksDto["imageUrl"]) {
    const [dominantColors, setDominantColors] = useAtom(dominantColorsAtom);
    const imageRef = useRef<HTMLImageElement>(null);

    const onImageLoad = useCallback(() => {
        if (!imageUrl || dominantColors[imageUrl]) return;

        // If mosaic image, extract dominant color from top left quadrant
        if (imageUrl.includes("//mosaic")) {
            const regionWidth = imageRef.current!.naturalWidth / 2;
            const regionHeight = imageRef.current!.naturalHeight / 2;

            const palette = paletteFromImage(imageRef.current!, {
                colorCount: 8,
                strategy: "kmeans",
                pixelRatio: 2500 / (regionWidth * regionHeight),
                imageRegion: [0, 0, regionWidth, regionHeight],
            });

            const dominantColor = selectDominantColor(palette?.colors);
            setDominantColors((prev) => ({
                ...prev,
                [imageUrl]: dominantColor,
            }));
        } else {
            const palette = paletteFromImage(imageRef.current!, {
                colorCount: 8,
                strategy: "kmeans",
                pixelRatio: 2500 / (imageRef.current!.naturalWidth * imageRef.current!.naturalHeight),
            });

            const dominantColor = selectDominantColor(palette?.colors);
            setDominantColors((prev) => ({
                ...prev,
                [imageUrl]: dominantColor,
            }));
        }
    }, [imageUrl, dominantColors, setDominantColors]);

    return {
        imageRef,
        onImageLoad,
    };
}

function selectDominantColor(palette: PaletteColor[] | undefined) {
    if (!palette) return theme.colors.dominantDefault;

    const filteredPalette = palette.filter((color) => {
        const { h } = color.toHsv();
        const { a, b } = color.toLab();

        // Hues in (24, 42) range often look ugly
        const isAppropriateHue = h < 24 || h > 42;
        const isGrayish = Math.abs(a) + Math.abs(b) < 12;

        return !isGrayish && isAppropriateHue;
    });

    return filteredPalette[0] ? filteredPalette[0].toHex() : theme.colors.dominantDefault;
}

export default useDominantColorExtraction;
