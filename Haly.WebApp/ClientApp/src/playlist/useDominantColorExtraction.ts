import { extend } from "colord";
import lab from "colord/plugins/lab";
import { useAtom } from "jotai";
import { PaletteColor, paletteFromImage } from "palette-from-image";
import { useCallback, useEffect, useRef } from "react";

import { PlaylistMetadataDto } from "../../generated/haly";
import { dominantColorsAtom } from "../common/atoms";
import { theme } from "../common/theme";

extend([lab]);

function useDominantColorExtraction(imageUrl: PlaylistMetadataDto["imageUrl"]) {
    const [dominantColors, setDominantColors] = useAtom(dominantColorsAtom);
    const imageRef = useRef<HTMLImageElement>(null);

    useEffect(() => {
        if (!imageUrl) {
            setDominantColors((prev) => ({
                ...prev,
                [""]: theme.colors.dominantDefault,
            }));
        }
    }, [imageUrl, setDominantColors]);

    const onImageLoad = useCallback(() => {
        if (!imageUrl || dominantColors[imageUrl]) return;

        // If mosaic image, extract dominant color from top left quadrant
        if (imageUrl.includes("//mosaic")) {
            const regionWidth = imageRef.current!.naturalWidth / 2;
            const regionHeight = imageRef.current!.naturalHeight / 2;

            const palette = paletteFromImage(imageRef.current!, {
                colorCount: 8,
                strategy: "kmeans",
                pixelRatio: calcPixelRatio(regionWidth * regionHeight),
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
                pixelRatio: calcPixelRatio(imageRef.current!.naturalWidth * imageRef.current!.naturalHeight),
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

function calcPixelRatio(imagePixelCount: number) {
    return 1000 / imagePixelCount;
}

function selectDominantColor(palette: PaletteColor[] | undefined) {
    if (!palette) return theme.colors.dominantDefault;

    const dominantColor = palette.filter((color) => {
        const { a, b } = color.toLab();

        return Math.abs(a) + Math.abs(b) > 12;
    });

    return dominantColor[0] ? dominantColor[0].toHex() : theme.colors.dominantDefault;
}

export default useDominantColorExtraction;
