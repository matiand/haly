import { useAtomValue } from "jotai";
import { useSetAtom } from "jotai/index";
import { MouseEvent, useCallback, useEffect } from "react";
import { TbPlayerSkipBackFilled, TbPlayerSkipForwardFilled } from "react-icons/tb";

import { playerSdkAtom, StreamedTrackDto } from "../common/atoms/playbackAtoms";
import { selectedTracksAtom } from "../common/atoms/trackAtoms";
import { styled } from "../common/theme";
import DeviceDropdownMenu from "./DeviceDropdownMenu";
import LyricsAnchor from "./LyricsAnchor";
import PlaybackButton from "./PlaybackButton";
import PlaybackToggle from "./PlaybackToggle";
import QueueButton from "./QueueButton";
import RepeatButton from "./RepeatButton";
import ShuffleButton from "./ShuffleButton";
import StreamedTrackBlock from "./StreamedTrackRegion";
import TrackProgress, { EmptyTrackProgress } from "./TrackProgress";
import VolumeControl from "./VolumeControl";

type PlaybackControlsProps = {
    track: StreamedTrackDto | null;
    initialVolume: number;
};

function PlaybackControls({ track, initialVolume }: PlaybackControlsProps) {
    const player = useAtomValue(playerSdkAtom);

    const setSelectedTracks = useSetAtom(selectedTracksAtom);
    const clearSelection = useCallback(
        (e: MouseEvent) => {
            const target = e.target as HTMLElement;

            if (target.tagName === "DIV") {
                setSelectedTracks([]);
            }
        },
        [setSelectedTracks],
    );

    useEffect(() => {
        const keyHandler = (e: KeyboardEvent) => {
            if (e.code === "Space" && !e.repeat) {
                if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

                e.preventDefault();
                player?.togglePlay();
            }
        };

        window.addEventListener("keydown", keyHandler);
        return () => window.removeEventListener("keydown", keyHandler);
    }, [player]);

    if (!player) return null;

    if (!track) {
        return (
            <Wrapper onClick={clearSelection}>
                <div />

                <ControlsWrapper>
                    <div>
                        <PlaybackToggle size="small" isPaused toggle={() => null} disabled />
                    </div>

                    <div>
                        <EmptyTrackProgress />
                    </div>
                </ControlsWrapper>

                <div>
                    <QueueButton />
                    <DeviceDropdownMenu />
                    <VolumeControl
                        key={initialVolume}
                        initialLevel={initialVolume}
                        setVolume={(level) => player.setVolume(level)}
                        getVolume={() => player.getVolume()}
                    />
                </div>
            </Wrapper>
        );
    }

    return (
        <Wrapper onClick={clearSelection}>
            <StreamedTrackBlock streamedTrack={track} />

            <ControlsWrapper aria-label="Playback controls">
                <div>
                    <ShuffleButton />
                    <PlaybackButton
                        label="Previous track"
                        icon={<TbPlayerSkipBackFilled />}
                        onClick={() => player.previousTrack()}
                    />

                    <PlaybackToggle size="small" isPaused={track.isPaused} toggle={() => player.togglePlay()} />

                    <PlaybackButton
                        label="Next track"
                        icon={<TbPlayerSkipForwardFilled />}
                        onClick={() => player.nextTrack()}
                    />
                    <RepeatButton />
                </div>

                <div>
                    <TrackProgress
                        key={track.playbackId}
                        track={track}
                        seek={(positionInMs) => player.seek(positionInMs)}
                    />
                </div>
            </ControlsWrapper>

            <div>
                <LyricsAnchor track={track} />
                <QueueButton />
                <DeviceDropdownMenu />
                <VolumeControl
                    key={initialVolume}
                    initialLevel={initialVolume}
                    setVolume={(level) => player.setVolume(level)}
                    getVolume={() => player.getVolume()}
                />
            </div>
        </Wrapper>
    );
}

const Wrapper = styled("div", {
    alignItems: "center",
    display: "flex",
    height: "$playbackControlsHeight",
    justifyContent: "space-between",
    padding: "0 $400",
    width: "100%",

    "& > *": {
        display: "flex",
    },

    "& > div:first-child": {
        width: "30%",
        gap: "$600",

        "& > :last-child": {
            padding: "0 $400",
        },
    },

    "& > div:nth-child(2)": {
        justifyContent: "center",
        width: "40%",
    },

    "& > div:last-child": {
        gap: "$200",
        justifyContent: "flex-end",
        width: "30%",
    },
});

const ControlsWrapper = styled("div", {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",

    "& > div:first-of-type": {
        alignItems: "center",
        display: "flex",
        flexFlow: "row nowrap",
        gap: "$400",
        marginBottom: "$400",

        "& > button:nth-child(3)": {
            margin: "0 $400",
        },
    },
    "& > div:last-of-type": {
        height: "18px",
        width: "100%",
    },
});
export default PlaybackControls;
