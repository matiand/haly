import clsx from "clsx";
import React from "react";
import { HiPause, HiPlay } from "react-icons/hi2";
import { MdPodcasts } from "react-icons/md";

import { styled } from "../common/theme";
import AnimatedMusicBars from "../ui/AnimatedMusicBars";
import { TrackPlaybackState } from "./useTableRowPlaybackState";
import { ContextPlaybackState } from "../playback/useContextPlaybackState";

type PlaybackCellProps = {
    position: number;
    name: string;
    playbackState: TrackPlaybackState | ContextPlaybackState;
    playbackAction?: () => void;
    isPodcast?: boolean;
};

function PlaybackCell({ position, name, playbackState, playbackAction, isPodcast }: PlaybackCellProps) {
    if (!playbackAction) {
        return (
            <Wrapper className={clsx({ alwaysIndex: true })}>
                <Index>{position}</Index>
            </Wrapper>
        );
    }

    if (isPodcast) {
        return (
            <Wrapper>
                <Index>{position}</Index>
                <Button
                    type="button"
                    aria-label="Streaming podcasts is not supported"
                    title="Streaming podcasts is not supported"
                    disabled
                    aria-disabled
                >
                    <span aria-hidden>
                        <MdPodcasts />
                    </span>
                </Button>
            </Wrapper>
        );
    }

    const isPlaying = playbackState === "playing";
    const label = isPlaying ? `Pause ${name}` : `Play ${name}`;
    const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        playbackAction();
    };

    return (
        <Wrapper>
            {isPlaying ? <AnimatedMusicBars type="cell" /> : <Index>{position}</Index>}

            <Button type="button" onClick={onClick} aria-label={label} title={label}>
                <span aria-hidden>{isPlaying ? <HiPause /> : <HiPlay />}</span>
            </Button>
        </Wrapper>
    );
}

const Wrapper = styled("div", {
    alignItems: "center",
    color: "$white500",
    display: "flex",
    fontSize: "$300",
    fontWeight: 500,
    height: "16px",
    justifyContent: "flex-end",
    position: "relative",
    width: "16px",

    "&&&.alwaysIndex > span": {
        display: "block",
    },
});

const Index = styled("span", {
    fontVariant: "tabular-nums",
    position: "absolute",
    right: ".2em",
});

const Button = styled("button", {
    background: "transparent",
    border: 0,
    color: "$white800",
    height: "16px",
    padding: 0,
    position: "absolute",
    width: "16px",

    "& svg": {
        height: "16px",
        width: "16px",
    },
});

export default PlaybackCell;
