import { LuMonitorSpeaker } from "react-icons/lu";

import { StreamedTrack } from "../common/atoms";
import HeartButton from "../common/HeartButton";
import { styled } from "../common/theme";
import TrackInformation from "../table/TrackInformation";
import PlaybackToggle from "./PlaybackToggle";

type PlaybackControlsProps = {
    track: StreamedTrack;
};

function PlaybackControls({ track }: PlaybackControlsProps) {
    return (
        <Wrapper>
            <div>
                <TrackInformation track={track} type="playback" />
                <HeartButton size="small" />
            </div>

            <div>
                <PlaybackToggle size="small" />
            </div>

            <div>
                <div>
                    <Button aria-label="Connect to a device" title="Connect to a device">
                        <span aria-hidden>
                            <LuMonitorSpeaker />
                        </span>
                    </Button>
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
        // alignItems: "center",
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

const Button = styled("button", {
    $$size: "40px",

    background: "transparent",
    border: "none",
    color: "$white400",
    cursor: "pointer",
    height: "$$size",
    minWidth: "$$size",
    padding: "$400",
    // position: "relative",
    width: "$$size",

    "&:hover": {
        color: "$white800",
    },

    "& span, & svg": {
        height: "20px",
        width: "20px",
    },

    marginLeft: "200px",
});

const DeviceArrow = styled("div", {
    borderBottom: "10px solid $primary400",
    borderLeft: "10px solid transparent",
    borderRight: "10px solid transparent",
    maxWidth: "20px",
    position: "relative",
    bottom: "-20px",
});

export default PlaybackControls;
