import { DragMoveEvent, DragOverlay, DragStartEvent, useDndMonitor } from "@dnd-kit/core";
import { useState } from "react";
import { createPortal } from "react-dom";

import { styled } from "../common/theme";

type Point = {
    x: number;
    y: number;
};

type DraggedItemData = {
    name: string;
};

function DraggingOverlay() {
    const [position, setPosition] = useState<Point | null>(null);
    const [data, setData] = useState<DraggedItemData | null>(null);

    useDndMonitor({
        onDragStart(event: DragStartEvent) {
            const data = event.active.data.current as DraggedItemData;
            // console.log("start");
            // setName(data.name);
            setPosition(null);
            setData(data);
        },
        onDragMove(event: DragMoveEvent) {
            if (event.activatorEvent instanceof PointerEvent) {
                const { x, y } = event.activatorEvent;
                // console.log("ORIGIN", x, y);
                if (event.active.rect.current.initial && event.active.rect.current.translated) {
                    const offsetX = event.active.rect.current.translated.left - event.active.rect.current.initial?.left;
                    const offsetY = event.active.rect.current.translated.top - event.active.rect.current.initial?.top;
                    // console.log("OFFSET", offsetX, offsetY);
                    setPosition({
                        x: x + offsetX,
                        y: y + offsetY,
                    });
                }
            }
            // console.group("positions");
            // console.log(event.activatorEvent instanceof PointerEvent);
            // console.log("activator event", event.activatorEvent.x, event.activatorEvent.y);
            // // console.log("delta", event.delta);
            // // console.log("origins", originX, originY);
            // // console.log("offsets", offsetX, offsetY);
            // console.log("initial rect", event.active.rect.current.initial);
            // console.log("active rect", event.active.rect.current.translated);
            // console.groupEnd();

            // setPosition({
            //     x: (event.active.rect.current.translated?.left ?? 0) - originX + offsetX,
            //     y: (event.active.rect.current.translated?.top ?? 0) - originY + offsetY,
            // });

            // const actualDeltaX = (event.active.rect.current.translated?.left ?? event.activatorEvent.x);
            // const actualDeltaY = (event.active.rect.current.translated?.left ?? event.activatorEvent.x);

            // setPosition({
            //     x: (event.activatorEvent.x ?? 0),
            //     y: (event.activatorEvent.y ?? 0),
            // });

            // setPosition({
            //     x: event.active.rect.current.translated?.left,
            //     y: event.active.rect.current.translated?.top + (data?.offsetY ?? 0),
            // });
        },
        // onDragCancel(event: DragCancelEvent) {
        //     console.log("position is null");
        //     // setPosition(null);
        //     setData(null)
        // },
        // onDragEnd(event: DragEndEvent) {
        //     console.log("position is null");
        //     // setPosition(null);
        //     setData(null)
        // },
    });

    if (!position || !data) return null;

    return createPortal(
        <Wrapper
            dropAnimation={null}
            style={{
                transform: undefined,
                left: position.x - 4,
                top: position.y - 4,
            }}
        >
            <span>{data.name}</span>
        </Wrapper>,
        document.body,
    );
}

const Wrapper = styled(DragOverlay, {
    background: "hsla(0, 0%, 15%, 0.9)",
    borderRadius: "4px",
    color: "$white800",
    cursor: "grabbing",
    fontSize: "$300",
    fontWeight: 500,
    height: "auto !important",
    padding: "$300 $500",
    width: "auto !important",
});

export default DraggingOverlay;
