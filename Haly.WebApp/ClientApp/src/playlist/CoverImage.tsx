import { MdOutlineMusicNote } from "react-icons/all";

import { AlbumDto } from "../../generated/haly";
import { styled } from "../common/theme";

type CoverImageProps = {
    alt: string;
    imageUrl: AlbumDto["imageUrl"];
    type: "playlist" | "track";
};

function CoverImage({ imageUrl, type }: CoverImageProps) {
    if (!imageUrl)
        return (
            <EmptyCover aria-hidden="true" type={type}>
                <MusicNoteIcon />
            </EmptyCover>
        );

    return <Image src={imageUrl} loading="eager" type={type} />;
}

const Image = styled("img", {
    $$playlistSize: "200px",
    $$trackSize: "40px",

    variants: {
        type: {
            playlist: {
                height: "$$playlistSize",
                width: "$$playlistSize",
            },
            track: {
                height: "$$trackSize",
                width: "$$trackSize",
            },
        },
    },
});

const EmptyCover = styled("div", {
    $$playlistSize: "200px",
    $$trackSize: "40px",

    alignItems: "center",
    background: "$black500",
    display: "flex",
    justifyContent: "center",

    variants: {
        type: {
            playlist: {
                minHeight: "$$playlistSize",
                height: "$$playlistSize",
                minWidth: "$$playlistSize",
                width: "$$playlistSize",
            },
            track: {
                minHeight: "$$trackSize",
                height: "$$trackSize",
                minWidth: "$$trackSize",
                width: "$$trackSize",
            },
        },
    },
});

const MusicNoteIcon = styled(MdOutlineMusicNote, {
    color: "$white",
});

export default CoverImage;
