import { styled } from "../common/theme";
import PlaybackToggle from "../playback/PlaybackToggle";
import ConnectBar from "./ConnectBar";

function Playback() {
    return (
        <Footer>
            <PlaybackControls>
                <PlaybackToggle size="small" />
            </PlaybackControls>

            <ConnectBar />
        </Footer>
    );
}

const Footer = styled("footer", {
    alignItems: "center",
    background: "$black800",
    display: "flex",
    flexFlow: "column nowrap",
    gridArea: "playback",
    justifyContent: "center",
});

const PlaybackControls = styled("div", {
    height: "$playbackControlsHeight",
});

export default Playback;
