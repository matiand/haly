import { LuMusic } from "react-icons/lu";
import { MdOutlineMusicNote } from "react-icons/md";

import { styled } from "../common/theme";

type EmptyCoverImageProps = {
    type: "track" | "card";
};

function EmptyCoverImage({ type }: EmptyCoverImageProps) {
    return (
        <Wrapper aria-hidden type={type}>
            {type === "track" ? <MdOutlineMusicNote /> : <LuMusic />}
        </Wrapper>
    );
}

const Wrapper = styled("div", {
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
            track: {
                $$size: "40px",

                minHeight: "$$size",
                height: "$$size",
                minWidth: "$$size",
                width: "$$size",
            },
        },
    },

    "& > svg": {
        color: "$white600",
    },
});

export default EmptyCoverImage;
