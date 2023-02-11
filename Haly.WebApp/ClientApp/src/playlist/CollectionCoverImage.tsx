import chroma from "chroma-js";
import ColorThief from "color-thief-ts";
import { useSetAtom } from "jotai";
import { useCallback, useRef } from "react";

import { AlbumDto } from "../../generated/haly";
import { collectionDominantColorAtom } from "../common/atoms";
import EmptyCoverImage from "../common/EmptyCoverImage";
import { styled, theme } from "../common/theme";
import TrackCoverImage from "../common/TrackCoverImage";

type CoverImageProps = {
    alt: string;
    imageUrl: string;
};

function CollectionCoverImage({ alt, imageUrl }: CoverImageProps) {
    const setCollectionDominantColor = useSetAtom(collectionDominantColorAtom);
    const imageRef = useRef<HTMLImageElement>(null);

    const onImageLoad = useCallback(() => {
        console.time("Dominant color extraction");
        const thief = new ColorThief();
        const dominantColor = thief.getColor(imageRef.current!, { colorType: "hex" });

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
    }, [setCollectionDominantColor]);

    return (
        <Image alt={alt} src={imageUrl} loading="eager" crossOrigin="anonymous" ref={imageRef} onLoad={onImageLoad} />
    );
}

const Image = styled("img", {
    $$size: "200px",

    height: "$$size",
    width: "$$size",
});

export default CollectionCoverImage;
