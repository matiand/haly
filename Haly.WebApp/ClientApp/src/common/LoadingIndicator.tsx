import { Waveform } from "@uiball/loaders";

import { styled, theme } from "./theme";
import { useDelayedRender } from "./useDelayedRender";

function LoadingIndicator() {
    const isReady = useDelayedRender();

    if (!isReady) return null;

    return (
        <Wrapper>
            <Waveform color={theme.colors.white800} />
        </Wrapper>
    );
}

const Wrapper = styled("div", {
    alignItems: "center",
    display: "flex",
    height: "100%",
    justifyContent: "center",
    width: "100%",

    "&&&": {
        position: "absolute",
    },
});

export default LoadingIndicator;
