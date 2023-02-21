import { FiMoreHorizontal } from "react-icons/all";

import { styled } from "./theme";

type MoreOptionsButtonProps = {
    label: string;
    size: "small" | "medium";
};

function MoreOptionsButton({ label, size }: MoreOptionsButtonProps) {
    return (
        <Button type="button" aria-haspopup="menu" aria-label={label} title={label}>
            <Icon size={size} />
        </Button>
    );
}

const Button = styled("button", {
    alignItems: "center",
    background: "transparent",
    border: "0",
    color: "$grey100",
    display: "flex",
    justifyContent: "center",
    padding: "0",

    "&:hover, &:active, &:focus": {
        color: "$white",
    },
});

const Icon = styled(FiMoreHorizontal, {
    //     const Icon = styled(IoIosMore, {
    // const Icon = styled(FiMoreHorizontal, {
    variants: {
        size: {
            small: {
                color: "$white",
                height: "24px",
                width: "16px",
            },
            medium: {
                height: "40px",
                width: "40px",
            },
        },
    },
});

export default MoreOptionsButton;
