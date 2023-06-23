import { AlbumDto } from "../../generated/haly";
import EmptyCoverImage from "./EmptyCoverImage";
import { styled } from "./theme";

type CoverImageProps = {
    alt: string;
    imageUrl: AlbumDto["imageUrl"];
};

function TrackCoverImage({ alt, imageUrl }: CoverImageProps) {
    if (!imageUrl) return <EmptyCoverImage type="track" />;

    return <Image alt={alt} src={imageUrl} loading="eager" width="40px" height="40px" />;
}

const Image = styled("img", {
    $$size: "40px",

    height: "$$size",
    width: "$$size",
});

export default TrackCoverImage;
