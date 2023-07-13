import { AlbumBriefDto } from "../../generated/haly";
import EmptyCoverImage from "./EmptyCoverImage";
import { styled } from "./theme";

type CoverImageProps = {
    imageUrl: AlbumBriefDto["imageUrl"];
    type: "cell" | "playback";
};

const cellSize = 40;
const playbackSize = 56;

function TrackCoverImage({ imageUrl, type }: CoverImageProps) {
    if (type === "playback")
        return (
            imageUrl && (
                <Image
                    type={type}
                    aria-hidden
                    src={imageUrl}
                    loading="eager"
                    width={playbackSize}
                    height={playbackSize}
                />
            )
        );

    return imageUrl ? (
        <Image type={type} alt="" src={imageUrl} loading="eager" width={cellSize} height={cellSize} />
    ) : (
        <EmptyCoverImage type="cell" />
    );
}

const Image = styled("img", {
    variants: {
        type: {
            cell: {
                $$size: `${cellSize}px`,
            },
            playback: {
                $$size: `${playbackSize}px`,

                borderRadius: "4px",
            },
        },
    },

    height: "$$size",
    width: "$$size",
});

export default TrackCoverImage;
