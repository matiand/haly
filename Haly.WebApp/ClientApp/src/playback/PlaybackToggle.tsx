import { MouseEventHandler, useEffect } from "react";
import { HiPause, HiPlay } from "react-icons/hi2";

import { styled, theme } from "../common/theme";

type PlaybackToggleProps = {
    size: "small" | "medium" | "large";
    isPaused: boolean;
    toggle: () => void;
    disabled?: boolean;
    handlesSpacebar?: boolean;
};

function PlaybackToggle({ size, isPaused, toggle, disabled }: PlaybackToggleProps) {
    // This won't work (I think) in browsers. If some other button is focused, spacebar will activate them both.
    // useSpacebarShortcut(toggle, { enabled: !!handlesSpacebar && !disabled });

    const label = isPaused ? "Play" : "Pause";
    const onClick: MouseEventHandler<HTMLButtonElement> = (e) => {
        e.stopPropagation();

        toggle();
    };

    return (
        <Button
            size={size}
            type="button"
            onClick={onClick}
            aria-label={label}
            title={label}
            aria-disabled={disabled}
            disabled={disabled}
        >
            <span aria-hidden>{isPaused ? <HiPlay /> : <HiPause className="pause-icon" />}</span>
        </Button>
    );
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function useSpacebarShortcut(
    cb: () => void,
    options: {
        enabled: boolean;
    },
) {
    return useEffect(() => {
        if (!options.enabled) return;

        const keyHandler = (e: KeyboardEvent) => {
            if (e.code === "Space" && !e.repeat) {
                cb();
            }
        };

        document.addEventListener("keydown", keyHandler);

        return () => document.removeEventListener("keydown", keyHandler);
    }, [options.enabled, cb]);
}

const Button = styled("button", {
    variants: {
        size: {
            small: {
                background: "$white800",
                color: "$black800",
                cursor: "default",
                $$size: theme.sizes.playbackControlsButtonSize,
                $$iconSize: "22px",

                "& .pause-icon": {
                    $$iconSize: "28px",
                    left: "0px",
                },

                "&:active": {
                    background: "$white800",
                },
            },
            medium: {
                $$size: "46px",
                $$iconSize: "24px",

                "& .pause-icon": {
                    $$iconSize: "30px",
                    left: "0px",
                },
            },
            large: {
                $$size: "56px",
                $$iconSize: "28px",

                "& .pause-icon": {
                    $$iconSize: "36px",
                    left: "0px",
                },
            },
        },
    },

    alignItems: "center",
    background: "$primary400",
    border: "0",
    borderRadius: "500px",
    cursor: "pointer",
    display: "flex",
    height: "$$size",
    justifyContent: "center",
    padding: "0",
    transition: "background 0.033s ease",
    userSelect: "none",
    width: "$$size",

    "& svg": {
        height: "$$iconSize",
        left: "1px",
        position: "relative",
        width: "$$iconSize",
    },

    "&:hover": {
        transform: "scale(1.06)",
    },

    "&:active": {
        background: "$primary500",
        transform: "scale(1)",
    },

    "&[disabled]": {
        opacity: 0.5,
        transform: "none",
    },
});

export default PlaybackToggle;

export { Button as PlaybackToggleStyledClass };
