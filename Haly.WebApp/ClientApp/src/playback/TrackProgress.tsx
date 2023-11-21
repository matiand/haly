import format from "date-fns/format";
import { useEffect, useRef, useState } from "react";

import { StreamedTrack } from "../common/atoms/playbackAtoms";
import { styled } from "../common/theme";
import ProgressBar from "./ProgressBar";

type TrackProgressProps = {
    track: StreamedTrack;
    seek: (positionInMs: number) => void;
};

function TrackProgress({ track, seek }: TrackProgressProps) {
    const [positionInMs, setPositionInMs] = useState(track.positionInMs);
    const [provisionalPositionInMs, setProvisionalPositionInMs] = useState<number | null>(null);
    const intervalId = useRef<number>();

    // Whenever the position of a track changes, we adjust the refresh rate with setTimeout so that
    // each refresh occurs at the beginning of a second. This makes sure that each second is shown.
    useEffect(() => {
        const positionNeedsAdjustment = track.positionInMs % 1000 > 50;
        let adjustment = 0;
        if (positionNeedsAdjustment) {
            adjustment = 1000 - (track.positionInMs % 1000);
        }

        const tId = setTimeout(() => {
            setProvisionalPositionInMs(null);

            setPositionInMs(track.isPaused ? track.positionInMs : track.positionInMs + (Date.now() - track.updatedAt));

            intervalId.current = setInterval(() => {
                setPositionInMs(
                    track.isPaused ? track.positionInMs : track.positionInMs + (Date.now() - track.updatedAt),
                );
            }, 1000);
        }, adjustment);

        return () => {
            clearTimeout(tId);
            clearInterval(intervalId.current);
        };
    }, [track.isPaused, track.positionInMs, track.updatedAt]);

    const positionToUse = provisionalPositionInMs ?? positionInMs;
    const positionInSeconds = toSeconds(Math.min(positionToUse, track.durationInMs));
    const durationInSeconds = toSeconds(track.durationInMs);

    return (
        <Wrapper>
            <span>{formatTime(positionInSeconds)}</span>

            <ProgressBar
                value={positionInSeconds}
                onChange={(newValue) => {
                    setProvisionalPositionInMs(newValue * 1000);
                }}
                onCommit={(finalValue) => {
                    seek(finalValue * 1000);
                }}
                step={1}
                max={durationInSeconds}
                label="Change track progress"
            />

            <span>{formatTime(durationInSeconds)}</span>
        </Wrapper>
    );
}

export function EmptyTrackProgress() {
    return (
        <Wrapper>
            <span>-:--</span>
            <ProgressBar value={0} onChange={() => null} step={1} max={100} label="Change track progress" disabled />
            <span>-:--</span>
        </Wrapper>
    );
}

function toSeconds(ms: number) {
    return Math.floor(ms / 1000);
}

function formatTime(seconds: number) {
    if (seconds >= 3600) return format((seconds - 3600) * 1000, "H:mm:ss");

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
