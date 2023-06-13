import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { PaletteColor, paletteFromImage } from "palette-from-image";
import { useCallback, useEffect, useRef } from "react";

import { dominantColorsAtom } from "../common/atoms";
import { styled, theme } from "../common/theme";

type CoverImageProps = {
    alt: string;
    imageUrl: string;
};

function CollectionCoverImage({ alt, imageUrl }: CoverImageProps) {
    // const setDominantColors = useSetAtom(dominantColorsAtom);
    const [dominantColors, setDominantColors] = useAtom(dominantColorsAtom);
    const imageRef = useRef<HTMLImageElement>(null);

    const onImageLoad = useCallback(() => {
        if (dominantColors[imageUrl]) return;

        console.time("Dominant color extraction");

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
            setDominantColors((prev) => ({ ...prev, [imageUrl]: dominantColor }));
        } else {
            const palette = paletteFromImage(imageRef.current!, {
                colorCount: 8,
                strategy: "kmeans",
                pixelRatio: calcPixelRatio(imageRef.current!.naturalWidth * imageRef.current!.naturalHeight),
            });

            const dominantColor = selectDominantColor(palette?.colors);
            setDominantColors((prev) => ({ ...prev, [imageUrl]: dominantColor }));
        }

        console.timeEnd("Dominant color extraction");
    }, [imageUrl, dominantColors, setDominantColors]);

    if (!imageUrl) return null;

    return (
        <Image alt={alt} src={imageUrl} loading="eager" crossOrigin="anonymous" ref={imageRef} onLoad={onImageLoad} />
    );
}

function calcPixelRatio(imagePixelCount: number) {
    return 1000 / imagePixelCount;
}

function selectDominantColor(palette: PaletteColor[] | undefined) {
    if (!palette) return theme.colors.defaultDominantColor;

    const dominantColor = palette.filter((color) => {
        const { s, v } = color.toHsv();

        return s > 0.2 && v > 0.2;
    });

    return dominantColor[0] ? dominantColor[0].toHex() : theme.colors.defaultDominantColor;
}

const Image = styled("img", {
    $$size: "220px",

    height: "$$size",
    width: "$$size",
});

export default CollectionCoverImage;
