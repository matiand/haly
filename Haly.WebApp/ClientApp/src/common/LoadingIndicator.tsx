import { Waveform } from "@uiball/loaders";
import { useEffect, useState } from "react";

import { styled, theme } from "./theme";

function LoadingIndicator() {
    const [showIndicator, setShowIndicator] = useState(false);
    const delayInMs = 800;

    useEffect(() => {
        const timer = setTimeout(() => setShowIndicator(true), delayInMs);

        return () => clearTimeout(timer);
    }, []);

    if (!showIndicator) return null;

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
