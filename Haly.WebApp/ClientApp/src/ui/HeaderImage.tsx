import React from "react";

import { PlaylistWithTracksDto } from "../../generated/haly";
import { styled } from "../common/theme";
import useDominantColorExtraction from "../common/useDominantColorExtraction";
import Draggable from "../dnd/Draggable";
import { DraggableData } from "../dnd/useDraggable";

type HeaderImageProps = {
    alt: string;
    imageUrl: PlaylistWithTracksDto["imageUrl"];
    isRounded?: boolean;

    onViewArtwork?: (e: React.MouseEvent) => void;
    onContextMenu?: (e: React.MouseEvent) => void;
    draggableData?: DraggableData;
};

const imageSize = "220";

function HeaderImage({ alt, imageUrl, isRounded, onViewArtwork, onContextMenu, draggableData }: HeaderImageProps) {
    const { imageRef, onImageLoad } = useDominantColorExtraction(imageUrl!);

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

    const draggableJsx = draggableData ? (
        <Draggable id="header-image" data={draggableData}>
            {imageJsx}
        </Draggable>
    ) : (
        imageJsx
    );

    return onViewArtwork ? (
        <Button type="button" aria-label="View artwork" onClick={onViewArtwork}>
            {draggableJsx}
        </Button>
    ) : (
        draggableJsx
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
