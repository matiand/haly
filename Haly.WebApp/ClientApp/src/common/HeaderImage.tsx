import { PlaylistMetadataDto } from "../../generated/haly";
import useDominantColorExtraction from "../playlist/useDominantColorExtraction";
import { styled } from "./theme";

type HeaderImageProps = {
    alt: string;
    imageUrl: PlaylistMetadataDto["imageUrl"];
    isRounded?: boolean;
};

const imageSize = "220";

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

const Image = styled("img", {
    boxShadow: "0 4px 60px $collectionImage",
    flex: "0 0 auto",
    objectFit: "cover",
    objectPosition: "center center",
    textAlign: "center",
});

export default HeaderImage;
