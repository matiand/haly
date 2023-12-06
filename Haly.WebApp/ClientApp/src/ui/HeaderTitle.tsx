import React from "react";

import { styled } from "../common/theme";
import useResizableFont from "../common/useResizableFont";

const titleSizeSteps = [90, 66, 42, 30];

type HeaderTitleProps = {
    name: string;
    onContextMenu?: (e: React.MouseEvent) => void;
};

function HeaderTitle({ name, onContextMenu }: HeaderTitleProps) {
    const { resizableRef } = useResizableFont(titleSizeSteps);

    return (
        <Title
            ref={(node) => {
                resizableRef.current = node!;
            }}
            onContextMenu={onContextMenu}
        >
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
