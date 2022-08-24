import { Waveform } from "@uiball/loaders";

import { styled } from "./theme";

function Loading() {
    return (
        <Wrapper>
            <Waveform />
        </Wrapper>
    );
}

const Wrapper = styled("div", {
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
});

export default Loading;
