import { AlbumBriefDto } from "../../generated/haly";
import EmptyCoverImage from "./EmptyCoverImage";
import { styled } from "./theme";

type CoverImageProps = {
    imageUrl: AlbumBriefDto["imageUrl"];
    type: "cell" | "playback";
};

function TrackCoverImage({ imageUrl, type }: CoverImageProps) {
    if (type === "playback" && !imageUrl) return null;

    if (!imageUrl) return <EmptyCoverImage type="cell" />;

    return <Image type={type} aria-hidden src={imageUrl} loading="eager" width="40px" height="40px" />;
}

const Image = styled("img", {
    variants: {
        type: {
            cell: {
                $$size: "40px",
            },
            playback: {
                $$size: "56px",

                borderRadius: "4px",
            },
        },
    },

    height: "$$size",
    width: "$$size",
});

export default TrackCoverImage;
