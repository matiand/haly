import { styled } from "../common/theme";
import PlaybackToggle from "../player/PlaybackToggle";

function Playback() {
    return (
        <Wrapper>
            <PlaybackToggle size="small" />
        </Wrapper>
    );
}

const Wrapper = styled("div", {
    background: "$black800",
    gridArea: "playback",
    height: "$playbackHeight",

    display: "flex",
    alignItems: "center",
    justifyContent: "center",

    "& > div": {},
});

export default Playback;
