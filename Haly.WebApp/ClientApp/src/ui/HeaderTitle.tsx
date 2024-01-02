import React from "react";

import { styled } from "../common/theme";
import useResizableFont from "../common/useResizableFont";
import Draggable from "../dnd/Draggable";
import { DraggableData } from "../dnd/useDraggable";

const titleSizeSteps = [90, 66, 42, 30];

type HeaderTitleProps = {
    name: string;
    onEditDetails?: (e: React.MouseEvent) => void;
    onContextMenu?: (e: React.MouseEvent) => void;
    draggableData?: DraggableData;
};

function HeaderTitle({ name, onEditDetails, onContextMenu, draggableData }: HeaderTitleProps) {
    const { resizableRef } = useResizableFont(titleSizeSteps);

    const titleJsx = (
        <Title ref={resizableRef} onContextMenu={onContextMenu}>
            {name}
        </Title>
    );

    const draggableJsx = draggableData ? (
        <Draggable id="header-title" data={draggableData}>
            {titleJsx}
        </Draggable>
    ) : (
        titleJsx
    );

    return onEditDetails ? (
        <Button type="submit" aria-label="Edit details" onClick={onEditDetails}>
            {draggableJsx}
        </Button>
    ) : (
        draggableJsx
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

const Button = styled("button", {
    color: "inherit",
    cursor: "pointer",
    textAlign: "start",
});

export default HeaderTitle;
