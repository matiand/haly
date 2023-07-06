import { LuMusic } from "react-icons/lu";
import { MdOutlineMusicNote } from "react-icons/md";

import { styled } from "./theme";

type EmptyCoverImageProps = {
    type: "cell" | "card";
};

function EmptyCoverImage({ type }: EmptyCoverImageProps) {
    return (
        <Wrapper aria-hidden type={type}>
            {type === "cell" ? <MdOutlineMusicNote /> : <LuMusic />}
        </Wrapper>
    );
}

const Wrapper = styled("div", {
    $$collectionSize: "200px",
    $$trackSize: "40px",

    alignItems: "center",
    background: "$black200",
    display: "flex",
    justifyContent: "center",

    variants: {
        type: {
            card: {
                background: "$black100",
                height: "100%",
                position: "absolute",
                width: "100%",

                "& > svg": {
                    height: "50px",
                    width: "50px",
                    strokeWidth: "1px",
                },
            },
            cell: {
                minHeight: "$$trackSize",
                height: "$$trackSize",
                minWidth: "$$trackSize",
                width: "$$trackSize",
            },
        },
    },

    "& > svg": {
        color: "$white600",
    },
});

export default EmptyCoverImage;
