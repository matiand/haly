import React from "react";

import { styled } from "../common/theme";

type PlaybackButtonProps = {
    label: string;
    icon: React.ReactNode;
    checked?: "true" | "false" | "mixed";
};

function PlaybackButton({ label, icon, checked }: PlaybackButtonProps) {
    if (checked) {
        return (
            <Button role="checkbox" aria-checked={checked} aria-label={label} title={label}>
                <span aria-hidden>{icon}</span>
            </Button>
        );
    }

    return (
        <Button aria-label={label} title={label}>
            <span aria-hidden>{icon}</span>
        </Button>
    );
}

const Button = styled("button", {
    background: "transparent",
    border: "none",
    color: "$white400",
    padding: "0 $400",
    margin: "0 $100",

    "&:hover": {
        color: "$white800",
    },

    "&:active": {
        color: "$white400",
    },

    "& span, & svg": {
        height: "22px",
        width: "22px",
    },
});

export default PlaybackButton;
