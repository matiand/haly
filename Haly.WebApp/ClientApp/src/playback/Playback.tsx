import { styled } from "../common/theme";
import ConnectBar from "./ConnectBar";
import PlaybackControls from "./PlaybackControls";

function Playback() {
    return (
        <Footer>
            <PlaybackControls />
            {/*<ConnectBar />*/}
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

export default Playback;
