import { AlbumBriefDto } from "../../generated/haly";
import { styled } from "../common/theme";
import EmptyCoverImage from "../ui/EmptyCoverImage";

type CoverImageProps = {
    imageUrl: AlbumBriefDto["imageUrl"];
};

const size = 40;

function TrackCoverImage({ imageUrl }: CoverImageProps) {
    return imageUrl ? (
        <Image alt="" src={imageUrl} loading="eager" width={size} height={size} />
    ) : (
        <EmptyCoverImage type="cell" />
    );
}

const Image = styled("img", {
    flex: "0 0 auto",
});

export default TrackCoverImage;
