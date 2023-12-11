import { useSetAtom } from "jotai";
import React from "react";

import { PlaylistWithTracksDto } from "../../generated/haly";
import { modalAtom } from "../common/atoms/modalAtoms";
import { styled } from "../common/theme";
import useDominantColorExtraction from "../common/useDominantColorExtraction";

type HeaderImageProps = {
    alt: string;
    imageUrl: PlaylistWithTracksDto["imageUrl"];
    isRounded?: boolean;
    isAlbumArtwork?: boolean;
    onContextMenu?: (e: React.MouseEvent) => void;
};

const imageSize = "220";

function HeaderImage({ alt, imageUrl, isRounded, isAlbumArtwork, onContextMenu }: HeaderImageProps) {
    const { imageRef, onImageLoad } = useDominantColorExtraction(imageUrl!);
    const setModal = useSetAtom(modalAtom);

    if (!imageUrl) return null;

    const imageJsx = (
        <Image
            onContextMenu={onContextMenu}
            alt={alt}
            src={imageUrl}
            style={{ borderRadius: isRounded ? "50%" : undefined }}
            loading="eager"
            crossOrigin="anonymous"
            ref={imageRef}
            onLoad={onImageLoad}
            width={imageSize}
            height={imageSize}
        />
    );

    return isAlbumArtwork ? (
        <Button
            type="button"
            aria-label="View album artwork"
            onClick={() =>
                setModal({
                    type: "displayAlbumArtwork",
                    props: { imageUrl },
                })
            }
        >
            {imageJsx}
        </Button>
    ) : (
        imageJsx
    );
}

const Button = styled("button", {
    cursor: "pointer",
    transition: "transform 100ms linear",

    "&:hover": {
        transform: "scale(1.02)",
    },
});

const Image = styled("img", {
    boxShadow: "0 4px 60px $collectionImage",
    color: "$black600",
    objectFit: "cover",
    objectPosition: "center center",
    textAlign: "center",
});

export default HeaderImage;
