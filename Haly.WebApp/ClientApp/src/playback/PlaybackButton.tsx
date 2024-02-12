import clsx from "clsx";
import React from "react";

import { styled, theme } from "../common/theme";

type PlaybackButtonProps = {
    label: string;
    icon: React.ReactNode;
    checked?: "true" | "false" | "mixed";
    onClick?: () => void;
    onMouseEnter?: () => void;
    onMouseLeave?: () => void;
    highlightedWhenActive?: boolean;
};

function PlaybackButton({
    label,
    icon,
    checked,
    onClick,
    onMouseEnter,
    onMouseLeave,
    highlightedWhenActive,
}: PlaybackButtonProps) {
    if (checked) {
        return (
            <Button
                type="button"
                className={clsx({ active: checked !== "false" && highlightedWhenActive })}
                role="checkbox"
                aria-checked={checked}
                aria-label={label}
                title={label}
                onClick={onClick}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
            >
                <span aria-hidden>{icon}</span>
            </Button>
        );
    }

    return (
        <Button
            type="button"
            aria-label={label}
            title={label}
            onClick={onClick}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            <span aria-hidden>{icon}</span>
        </Button>
    );
}

const Button = styled("button", {
    $$size: theme.sizes.playbackControlsButtonSize,

    background: "transparent",
    border: "none",
    color: "$white400",
    height: "$$size",
    minWidth: "$$size",
    width: "$$size",
    padding: "0 $400",
    position: "relative",

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

    "&.active": {
        color: "$primary400",

        "&:active": {
            color: "$primary600",
        },

        "&:hover": {
            color: "$primary300",
        },

        "&::after": {
            background: "currentColor",
            borderRadius: "50%",
            content: "",
            display: "block",
            height: "4px",
            left: "50%",
            marginTop: "4px",
            position: "absolute",
            width: "4px",
        },
    },
});

export default PlaybackButton;
