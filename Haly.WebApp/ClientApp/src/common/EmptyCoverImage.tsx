import { MdOutlineMusicNote } from "react-icons/md";

import { styled } from "./theme";

type EmptyCoverImageProps = {
    type: "track" | "collection";
};

function EmptyCoverImage({ type }: EmptyCoverImageProps) {
    return (
        <Wrapper aria-hidden type={type}>
            <MusicNoteIcon />
        </Wrapper>
    );
}

const Wrapper = styled("div", {
    $$collectionSize: "200px",
    $$trackSize: "40px",

    alignItems: "center",
    background: "$black400",
    display: "flex",
    justifyContent: "center",

    variants: {
        type: {
            collection: {
                minHeight: "$$collectionSize",
                height: "$$collectionSize",
                minWidth: "$$collectionSize",
                width: "$$collectionSize",
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

export default EmptyCoverImage;
