import { AlbumBriefDto } from "../../../generated/haly";
import { styled } from "../../common/theme";
import EmptyCoverImage from "../EmptyCoverImage";

type CoverImageProps = {
    imageUrl: AlbumBriefDto["imageUrl"];
};

const size = 40;

function TrackCoverImage({ imageUrl }: CoverImageProps) {
    return imageUrl ? (
        <Image alt="" src={imageUrl} loading="eager" width={size} height={size} />
    ) : (
        <EmptyCoverImage type="track" />
    );
}

const Image = styled("img", {
    borderRadius: "4px",
    flex: "0 0 auto",
});

export default TrackCoverImage;
