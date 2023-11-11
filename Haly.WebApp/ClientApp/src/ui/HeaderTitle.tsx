import React, { useCallback, useRef } from "react";
import { useResizeDetector } from "react-resize-detector";

import { styled } from "../common/theme";

const titleSizeSteps = [90, 66, 42, 30];

type HeaderTitleProps = {
    name: string;
    onContextMenu?: (e: React.MouseEvent) => void;
};

function HeaderTitle({ name, onContextMenu }: HeaderTitleProps) {
    const titleRef = useRef<HTMLHeadingElement>(null);

    // Measure the title size and adjust it to fit the container
    const onResize = useCallback(() => {
        const node = titleRef.current;
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
    }, []);

    useResizeDetector({
        targetRef: titleRef,
        onResize,
    });

    return (
        <Title ref={titleRef} onContextMenu={onContextMenu}>
            {name}
        </Title>
    );
}

const Title = styled("h1", {
    $$fontSize: titleSizeSteps[0],

    fontSize: "$$fontSize",
    fontWeight: 800,
    letterSpacing: "-0.01em",
    lineHeight: 1.25,
    margin: "0 0 $600",
    overflow: "hidden",
    userSelect: "none",
    wordBreak: "break-word",
    "-webkit-line-clamp": 3,
    "-webkit-box-orient": "vertical",
    display: "-webkit-box",
});

export default HeaderTitle;
