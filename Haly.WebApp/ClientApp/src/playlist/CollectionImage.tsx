import { PlaylistMetadataDto } from "../../generated/haly";
import { styled } from "../common/theme";
import useDominantColorExtraction from "./useDominantColorExtraction";

type CollectionImageProps = {
    playlistId: string;
    alt: string;
    imageUrl: PlaylistMetadataDto["imageUrl"];
};

function CollectionImage({ alt, imageUrl }: CollectionImageProps) {
    const { imageRef, onImageLoad } = useDominantColorExtraction(imageUrl!);

    if (!imageUrl) return null;

    return (
        <Image
            alt={alt}
            src={imageUrl}
            loading="eager"
            crossOrigin="anonymous"
            ref={imageRef}
            onLoad={onImageLoad}
            width={imageSize}
            height={imageSize}
        />
    );
}

const imageSize = "220px";

const Image = styled("img", {
    $$size: `${imageSize}`,

    boxShadow: "0 4px 60px $collectionImage",
    height: "$$size",
    width: "$$size",
});

export default CollectionImage;
