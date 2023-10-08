import { FiMoreHorizontal } from "react-icons/fi";

import { styled } from "../common/theme";

type MoreOptionsButtonProps = {
    label: string;
    type: "album" | "playlist" | "track";
};

function MoreOptionsButton({ label, type }: MoreOptionsButtonProps) {
    return (
        <Button type="button" aria-haspopup="menu" aria-label={label} title={label}>
            <span aria-hidden>
                <Icon type={type} />
            </span>
        </Button>
    );
}

const Button = styled("button", {
    alignItems: "center",
    background: "transparent",
    border: "0",
    color: "$white700",
    cursor: "pointer",
    display: "flex",
    justifyContent: "center",
    padding: "0",

    "&:hover, &:active, &:focus": {
        color: "$white800",
    },
});

const Icon = styled(FiMoreHorizontal, {
    variants: {
        type: {
            album: {},
            playlist: {},
            track: {
                color: "$white800",
                height: "24px",
                width: "16px",
            },
        },
    },

    height: "40px",
    width: "40px",
});

export default MoreOptionsButton;
