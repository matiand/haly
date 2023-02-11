import chroma from "chroma-js";
import ColorThief from "color-thief-ts";
import { useSetAtom } from "jotai";
import { useCallback, useRef } from "react";

import { collectionDominantColorAtom } from "../common/atoms";
import { styled } from "../common/theme";

type CoverImageProps = {
    alt: string;
    imageUrl: string;
};

function CollectionCoverImage({ alt, imageUrl }: CoverImageProps) {
    const setCollectionDominantColor = useSetAtom(collectionDominantColorAtom);
    const imageRef = useRef<HTMLImageElement>(null);
    const secondImageRef = useRef<HTMLImageElement>(null);

    const onImageLoad = useCallback(() => {
        console.time("Dominant color extraction");

        const canvas = document.createElement("canvas");
        canvas.height = 320;
        canvas.width = 320;
        canvas.getContext("2d")!.drawImage(imageRef.current!, 0, 0, 320, 320, 0, 0, 320, 320);
        secondImageRef.current!.src = canvas.toDataURL("image/jpeg");
    }, []);

    const extractColor = useCallback(() => {
        const thief = new ColorThief();

        let dominantColor;
        if (imageUrl.includes("//mosaic")) {
            dominantColor = thief.getColor(secondImageRef.current!, { colorType: "hex" });
        } else {
            dominantColor = thief.getColor(imageRef.current!, { colorType: "hex" });
        }

        let ratio = chroma.contrast("white", dominantColor);
        let finalColor = dominantColor;
        console.log("Starting color + ratio", dominantColor, ratio);

        while (ratio <= 2.5) {
            finalColor = chroma(finalColor).darken(0.08).hex("rgb");
            ratio = chroma.contrast("white", finalColor);
        }

        while (ratio >= 7.5) {
            finalColor = chroma(finalColor).brighten(0.08).hex("rgb");
            ratio = chroma.contrast("white", finalColor);
        }

        console.log("Final color + ratio", finalColor, ratio);
        setCollectionDominantColor(finalColor);
        console.timeEnd("Dominant color extraction");
    }, [imageUrl, setCollectionDominantColor]);

    return (
        <>
            <Image
                alt={alt}
                src={imageUrl}
                loading="eager"
                crossOrigin="anonymous"
                ref={imageRef}
                onLoad={onImageLoad}
            />
            <img
                alt="hidden img for color extraction"
                ref={secondImageRef}
                onLoad={extractColor}
                style={{ display: "none" }}
            />
        </>
    );
}

const Image = styled("img", {
    $$size: "210px",

    height: "$$size",
    width: "$$size",
});

export default CollectionCoverImage;
