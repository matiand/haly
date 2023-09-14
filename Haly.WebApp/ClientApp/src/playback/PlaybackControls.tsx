import { TbPlayerSkipBackFilled, TbPlayerSkipForwardFilled } from "react-icons/tb";

import { StreamedTrack } from "../common/atoms";
import { styled } from "../common/theme";
import TrackInformation from "../table/TrackInformation";
import HeartButton from "../ui/HeartButton";
import DeviceDropdown from "./DeviceDropdown";
import PlaybackButton from "./PlaybackButton";
import PlaybackToggle from "./PlaybackToggle";
import QueueButton from "./QueueButton";
import RepeatButton from "./RepeatButton";
import ShuffleButton from "./ShuffleButton";
import TrackProgress, { EmptyTrackProgress } from "./TrackProgress";
import VolumeControl from "./VolumeControl";

type PlaybackControlsProps = {
    track: StreamedTrack | null;
    player: Spotify.Player;
    initialVolume: number;
};

function PlaybackControls({ track, player, initialVolume }: PlaybackControlsProps) {
    if (!track) {
        return (
            <Wrapper>
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
                    <DeviceDropdown />
                    <VolumeControl
                        key={initialVolume}
                        initialLevel={initialVolume}
                        setVolume={(level) => player.setVolume(level)}
                    />
                </div>
            </Wrapper>
        );
    }

    return (
        <Wrapper>
            <div>
                <TrackInformation track={track} type="playback" />
                <HeartButton size="small" />
            </div>

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
                        key={track.spotifyId}
                        track={track}
                        seek={(positionInMs) => player.seek(positionInMs)}
                    />
                </div>
            </ControlsWrapper>

            <div>
                <QueueButton />
                <DeviceDropdown />
                <VolumeControl
                    key={initialVolume}
                    initialLevel={initialVolume}
                    setVolume={(level) => player.setVolume(level)}
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
