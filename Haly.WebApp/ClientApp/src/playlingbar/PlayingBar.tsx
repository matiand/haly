import { styled } from "../common/theme";

function PlayingBar() {
    return <Wrapper id="playingbar"></Wrapper>;
}

const Wrapper = styled("div", {
    background: "$black550",
    height: "$topbarHeight",
});

export default PlayingBar;
