import { PlaylistMetadataDto } from "../../generated/haly";
import useDominantColorExtraction from "../playlist/useDominantColorExtraction";
import { styled } from "./theme";

type HeaderImageProps = {
    alt: string;
    imageUrl: PlaylistMetadataDto["imageUrl"];
    isRounded?: boolean;
};

function HeaderImage({ alt, imageUrl, isRounded }: HeaderImageProps) {
    const { imageRef, onImageLoad } = useDominantColorExtraction(imageUrl!);

    if (!imageUrl) return null;

    return (
        <Image
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
}

const imageSize = "220px";

const Image = styled("img", {
    $$size: `${imageSize}`,

    boxShadow: "0 4px 60px $collectionImage",
    height: "$$size",
    width: "$$size",
});

export default HeaderImage;
