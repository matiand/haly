import { LuMusic } from "react-icons/lu";
import { MdOutlineMusicNote } from "react-icons/md";

import { styled } from "../common/theme";

type EmptyCoverImageProps = {
    type: "block" | "card";
    size?: number;
};

function EmptyCoverImage({ type, size }: EmptyCoverImageProps) {
    return (
        <Wrapper css={{ $$size: `${size ?? 40}px` }} aria-hidden type={type}>
            {type === "block" ? <MdOutlineMusicNote /> : <LuMusic />}
        </Wrapper>
    );
}

const Wrapper = styled("div", {
    alignItems: "center",
    background: "$black300",
    borderRadius: "4px",
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
            block: {
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
