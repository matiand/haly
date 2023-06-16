import { styled } from "../common/theme";

function PlayingBar() {
    return <Wrapper id="playingbar"></Wrapper>;
}

const Wrapper = styled("div", {
    background: "$black800",
    height: "$playingbarHeight",
});

export default PlayingBar;
