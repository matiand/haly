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
import TrackProgress from "./TrackProgress";
import VolumeControl from "./VolumeControl";

type PlaybackControlsProps = {
    track: StreamedTrack;
};

function PlaybackControls({ track }: PlaybackControlsProps) {
    return (
        <Wrapper>
            <div>
                {track && <TrackInformation track={track} type="playback" />}
                <HeartButton size="small" />
            </div>

            <ControlsWrapper aria-label="Playback controls">
                <div>
                    <ShuffleButton initialState={false} onChange={() => null} />
                    <PlaybackButton label="Previous track" icon={<TbPlayerSkipBackFilled />} />

                    <PlaybackToggle size="small" />

                    <PlaybackButton
                        label="Next track"
                        icon={<TbPlayerSkipForwardFilled />}
                        onClick={() => console.log("next track")}
                    />
                    <RepeatButton onChange={() => null} />
                </div>

                <div>
                    <TrackProgress key={track.spotifyId} track={track} />
                </div>
            </ControlsWrapper>

            <div>
                <QueueButton />
                <DeviceDropdown />
                <VolumeControl initialLevel={0.5} />
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
