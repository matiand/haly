import { LuMonitorSpeaker } from "react-icons/lu";
import { TbPlayerSkipBackFilled, TbPlayerSkipForwardFilled } from "react-icons/tb";

import { StreamedTrack } from "../common/atoms";
import HeartButton from "../common/HeartButton";
import { styled } from "../common/theme";
import TrackInformation from "../table/TrackInformation";
import PlaybackButton from "./PlaybackButton";
import PlaybackToggle from "./PlaybackToggle";
import ProgressBar from "./ProgressBar";
import QueueButton from "./QueueButton";
import RepeatButton from "./RepeatButton";
import ShuffleButton from "./ShuffleButton";
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

                    <PlaybackButton label="Next track" icon={<TbPlayerSkipForwardFilled />} />
                    <RepeatButton onChange={() => null} />
                </div>

                <div>
                    <ProgressBar
                        label="Change track progress"
                        max={100}
                        step={1}
                        initialValue={50}
                        onChange={() => null}
                    />
                </div>
            </ControlsWrapper>

            <div>
                <QueueButton />
                <PlaybackButton label="Connect to a device" icon={<LuMonitorSpeaker />} />
                <VolumeControl initialLevel={0.5} onChange={(value) => console.log("volume changed:", value)} />
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
