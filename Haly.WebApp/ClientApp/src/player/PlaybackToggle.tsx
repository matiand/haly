import { useState } from "react";
import { HiPause, HiPlay } from "react-icons/hi2";

import { styled } from "../common/theme";

function PlaybackToggle({ size }: { size: "small" | "medium" | "large" }) {
    const [isPaused, setIsPaused] = useState(true);
    const label = isPaused ? "Play" : "Pause";

    const onClick = () => setIsPaused((prev) => !prev);

    return (
        <Button size={size} type="button" onClick={onClick} aria-label={label} title={label}>
            <span aria-hidden>{isPaused ? <HiPlay /> : <HiPause className="pause-icon" />}</span>
        </Button>
    );
}

const Button = styled("button", {
    variants: {
        size: {
            small: {
                background: "$white800",
                color: "$black800",
                $$size: "36px",
                $$iconSize: "20px",

                "& .pause-icon": {
                    $$iconSize: "26px",
                    left: "0px",
                },

                "&:active": {
                    background: "$white800",
                },
            },
            medium: {
                $$size: "44px",
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
    transition: "transform 0.033s ease, background 0.033s ease",
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
});

export default PlaybackToggle;
