import { DragMoveEvent, DragOverlay, DragStartEvent, useDndMonitor } from "@dnd-kit/core";
import { useAtom } from "jotai";
import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";

import { selectedTracksAtom } from "../common/atoms/trackAtoms";
import { styled } from "../common/theme";
import { DraggableData } from "./useDraggable";

type Point = {
    x: number;
    y: number;
};

function DraggingOverlay() {
    const [position, setPosition] = useState<Point | null>(null);
    const [data, setData] = useState<DraggableData | null>(null);

    const [selectedTracks, setSelectedTracks] = useAtom(selectedTracksAtom);

    // Cancel existing track selection when a different element is dragged.
    useEffect(() => {
        if (
            data?.type === "table-row" &&
            selectedTracks.length > 0 &&
            selectedTracks.every((t) => t.track.id !== data?.id)
        ) {
            setSelectedTracks([]);
        }
    }, [data?.id, data?.type, selectedTracks, setSelectedTracks]);

    const onDragStart = useCallback((event: DragStartEvent) => {
        const data = event.active.data.current as DraggableData;

        setPosition(null);
        setData(data);
    }, []);

    const onDragMove = useCallback((event: DragMoveEvent) => {
        if (event.activatorEvent instanceof PointerEvent) {
            const { x, y } = event.activatorEvent;

            if (event.active.rect.current.initial && event.active.rect.current.translated) {
                const offsetX = event.active.rect.current.translated.left - event.active.rect.current.initial?.left;
                const offsetY = event.active.rect.current.translated.top - event.active.rect.current.initial?.top;

                // todo: add a comment here, if you still have the 'update depth' issue
                setPosition({
                    x: x + offsetX,
                    y: y + offsetY,
                });
            }
        }
    }, []);

    const onDragCancel = useCallback(() => {
        setData(null);
    }, []);

    const onDragEnd = useCallback(() => {
        setData(null);
    }, []);

    // There is an issue in useDndMonitor that sometimes causes onDragMove to fire after onDragCancel/onDragEnd.
    // This means that we always need to call setPosition(null) inside onDragStart, otherwise the
    // previous drag position can flash when the user starts a new drag.
    useDndMonitor({
        onDragStart,
        onDragMove,
        onDragCancel,
        onDragEnd,
    });

    if (!position || !data) return null;

    const isDraggingSelectedTracks =
        data.type === "table-row" && selectedTracks.length > 1 && selectedTracks.some((t) => t.track.id === data.id);
    const title = isDraggingSelectedTracks ? `${selectedTracks.length} tracks` : data.title;

    return createPortal(
        <Wrapper
            dropAnimation={null}
            style={{
                transform: undefined,
                left: position.x - 4,
                top: position.y - 4,
            }}
        >
            {typeof title === "string" ? (
                <span style={{ maxWidth: "350px" }}>{title}</span>
            ) : (
                <>
                    <span>{title[0]}</span>
                    <span>{title[1]}</span>
                </>
            )}
        </Wrapper>,
        document.body,
    );
}

const Wrapper = styled(DragOverlay, {
    background: "hsla(0, 0%, 15%, 0.9)",
    borderRadius: "4px",
    color: "$white800",
    cursor: "grabbing",
    display: "flex",
    fontSize: "$300",
    fontWeight: 500,
    height: "auto !important",
    padding: "$300 $500",
    pointerEvents: "all",
    width: "auto !important",

    "& > span": {
        flexShrink: 0,
    },

    "& > span:nth-of-type(2)::before": {
        content: "•",
        fontWeight: 300,
        margin: "0 $300",
    },
});

export default DraggingOverlay;
