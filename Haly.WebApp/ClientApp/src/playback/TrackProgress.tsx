import format from "date-fns/format";
import { useEffect, useRef, useState } from "react";

import { StreamedTrack } from "../common/atoms";
import { styled } from "../common/theme";
import ProgressBar from "./ProgressBar";

type TrackProgressProps = {
    track: StreamedTrack;
};

function TrackProgress({ track }: TrackProgressProps) {
    const [positionInMs, setPositionInMs] = useState(track.positionInMs);
    const intervalId = useRef<number>();

    useEffect(() => {
        const positionNeedsAdjustment = track.positionInMs % 1000 > 50;
        let adjustment = 0;
        if (positionNeedsAdjustment) {
            adjustment = 1000 - (track.positionInMs % 1000);
            console.log("adjusting", adjustment);
        }

        const tId = setTimeout(() => {
            setPositionInMs(track.isPaused ? track.positionInMs : track.positionInMs + (Date.now() - track.updatedAt));
            console.log("hello mr. interval", tId, track.positionInMs);

            intervalId.current = setInterval(() => {
                setPositionInMs(
                    track.isPaused ? track.positionInMs : track.positionInMs + (Date.now() - track.updatedAt),
                );
            }, 1000);
        }, adjustment);

        return () => {
            console.log("bye mr. interval", tId, intervalId.current);
            clearTimeout(tId);
            clearInterval(intervalId.current);
        };
    }, [track.isPaused, track.positionInMs, track.updatedAt]);

    console.log(track.durationInMs, positionInMs);

    const positionInSeconds = toSeconds(Math.min(positionInMs, track.durationInMs));
    const durationInSeconds = toSeconds(track.durationInMs);

    return (
        <Wrapper>
            <span>{formatTime(positionInSeconds)}</span>

            <ProgressBar
                value={positionInSeconds}
                onChange={(newValue) => setPositionInMs(newValue * 1000)}
                step={1}
                max={durationInSeconds}
                label="Change track progress"
            />

            <span>{formatTime(durationInSeconds)}</span>
        </Wrapper>
    );
}

function toSeconds(ms: number) {
    return Math.floor(ms / 1000);
}

function formatTime(seconds: number) {
    if (seconds >= 3600) return format(seconds * 1000, "H:mm:ss");

    return format(seconds * 1000, "m:ss");
}

const Wrapper = styled("div", {
    alignItems: "center",
    display: "flex",
    gap: "$400",

    "& > span": {
        color: "$white400",
        fontSize: "$100",
        fontWeight: 500,
        fontVariantNumeric: "tabular-nums",
        letterSpacing: "-0.04em",
        minWidth: "40px",
        userSelect: "none",

        "&:first-child": {
            textAlign: "end",
        },

        "&:last-child": {
            textAlign: "start",
        },
    },
});

export default TrackProgress;
