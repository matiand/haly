import { LuMonitorSpeaker } from "react-icons/lu";

import { TrackDto } from "../../generated/haly";
import HeartButton from "../common/HeartButton";
import { styled } from "../common/theme";
import TrackInformation from "../playlist/TrackInformation";
import PlaybackToggle from "./PlaybackToggle";

function PlaybackControls() {
    return (
        <Wrapper>
            <div>
                <TrackInformation track={tempTrack} type="playback" />
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
                        <DeviceArrow aria-hidden />
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

const tempTrack: TrackDto = {
    positionInPlaylist: 15,
    name: "Better In College",
    duration: "3:28",
    addedAt: "2023-06-30T11:31:41+00:00" as any,
    type: "Song",
    album: {
        id: "7EReSsFM8Grn3bJdjddsd4",
        name: "Walk Like Me",
        imageUrl: "https://i.scdn.co/image/ab67616d000048513beed64756e79a8186cdeb5d",
        artists: [
            {
                id: "42crL07E4WPfVovyUtMpvC",
                name: "Robert DeLong",
            },
        ],
    },
    artists: [
        {
            id: "42crL07E4WPfVovyUtMpvC",
            name: "Robert DeLong",
        },
        {
            id: "6P5NO5hzJbuOqSdyPB7SJM",
            name: "Ashe",
        },
    ],
};

export default PlaybackControls;
