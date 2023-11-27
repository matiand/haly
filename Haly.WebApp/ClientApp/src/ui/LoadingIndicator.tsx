import { Waveform } from "@uiball/loaders";

import { styled, theme } from "../common/theme";
import { useDelayedRender } from "../common/useDelayedRender";

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
    pointerEvents: "none",
    width: "100%",

    "&&&": {
        position: "absolute",
    },
});

export default LoadingIndicator;
