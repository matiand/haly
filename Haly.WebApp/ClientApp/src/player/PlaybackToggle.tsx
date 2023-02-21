import { useState } from "react";
import { IoPause, IoPlay } from "react-icons/all";

import { styled } from "../common/theme";

function PlaybackToggle() {
    const [isPaused, setIsPaused] = useState(true);
    const label = isPaused ? "Play" : "Pause";

    const onClick = () => setIsPaused((prev) => !prev);

    return (
        <Button type="button" onClick={onClick} aria-label={label} title={label}>
            {isPaused ? <PlaySvg /> : <PauseSvg />}
        </Button>
    );
}

const Button = styled("button", {
    alignItems: "center",
    background: "$primary400",
    border: "0",
    borderRadius: "500px",
    display: "flex",
    height: "56px",
    justifyContent: "center",
    padding: "0",
    transitionDuration: "33ms",
    userSelect: "none",
    width: "56px",

    "&:hover": {
        background: "$primary300",
    },

    "&:active": {
        background: "$primary500",
    },
});

const PlaySvg = styled(IoPlay, {
    height: "28px",
    marginLeft: "2px",
    width: "28px",
});

const PauseSvg = styled(IoPause, {
    height: "28px",
    width: "28px",
});

export default PlaybackToggle;
