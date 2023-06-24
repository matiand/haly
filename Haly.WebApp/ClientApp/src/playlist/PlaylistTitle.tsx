import { useCallback, useDeferredValue } from "react";
import { useWindowSize } from "usehooks-ts";

import { styled } from "../common/theme";

const titleSizeSteps = [90, 66, 42, 30];

function PlaylistTitle({ name }: { name: string }) {
    const { width: windowWidth } = useWindowSize();
    const width = useDeferredValue(windowWidth);

    // Measure the title size and adjust it to fit the container
    const titleRef = useCallback(
        (node: HTMLHeadingElement) => {
            if (!node) return;

            node.style.setProperty("visibility", "hidden");

            for (let i = 0; i < titleSizeSteps.length; i++) {
                const baseVal = titleSizeSteps[i];
                const val = (baseVal + baseVal * 0.08 + baseVal * 0.12) * 1.5;

                node.style.setProperty("font-size", `${baseVal}px`);

                const newHeight = node.getBoundingClientRect().height;

                if (val >= newHeight) break;
            }

            node.style.setProperty("visibility", "visible");
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [name, width],
    );

    return <Title ref={titleRef}>{name}</Title>;
}

const Title = styled("h1", {
    $$fontSize: titleSizeSteps[0],

    fontSize: "$$fontSize",
    fontWeight: 800,
    letterSpacing: "-0.03em",
    lineHeight: 1.25,
    margin: "0 0 $600",
    overflow: "hidden",
    userSelect: "none",
    wordBreak: "break-word",
    "-webkit-line-clamp": 3,
    "-webkit-box-orient": "vertical",
    display: "-webkit-box",
});

export default PlaylistTitle;
