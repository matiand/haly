import { styled } from "../common/theme";

function Playback() {
    return <Wrapper id="playback"></Wrapper>;
}

const Wrapper = styled("div", {
    background: "$black800",
    height: "$playbackHeight",
});

export default Playback;
