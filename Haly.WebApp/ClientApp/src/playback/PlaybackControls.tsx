import { LuMenu, LuMonitorSpeaker, LuVolume1 } from "react-icons/lu";
import { TbArrowsShuffle, TbPlayerSkipBackFilled, TbPlayerSkipForwardFilled, TbRepeat } from "react-icons/tb";

import { StreamedTrack } from "../common/atoms";
import HeartButton from "../common/HeartButton";
import { styled } from "../common/theme";
import TrackInformation from "../table/TrackInformation";
import PlaybackButton from "./PlaybackButton";
import PlaybackToggle from "./PlaybackToggle";

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
                    <div>
                        <PlaybackButton checked="false" label="Enable shuffle" icon={<TbArrowsShuffle />} />

                        <PlaybackButton label="Previous track" icon={<TbPlayerSkipBackFilled />} />
                    </div>

                    <PlaybackToggle size="small" />

                    <div>
                        <PlaybackButton label="Next track" icon={<TbPlayerSkipForwardFilled />} />

                        <PlaybackButton checked="false" label="Enable repeat" icon={<TbRepeat />} />
                    </div>
                </div>

                <div></div>
            </ControlsWrapper>

            <div>
                <div>
                    <PlaybackButton label="Queue" icon={<LuMenu />} />
                    <PlaybackButton label="Connect to a device" icon={<LuMonitorSpeaker />} />
                    <PlaybackButton label="Mute" icon={<LuVolume1 />} />
                </div>
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
        gap: "$600",
        marginBottom: "$400",

        "& > div": {
            display: "flex",
            // gap: "$400",

            "&:nth-child(1)": {
                justifyContent: "flex-end",
            },

            "& > button": {
                flexShrink: 0,
                flexGrow: 0,
            },
        },
    },

    "& > div:last-of-type": {
        height: "18px",
    },
});

export default PlaybackControls;
