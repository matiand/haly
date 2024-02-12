import { DndContext, PointerSensor, pointerWithin, useSensor, useSensors } from "@dnd-kit/core";
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

import { dndClassNames } from "./dndStyles";
import DraggingOverlay from "./DraggingOverlay";
import useDragEventHandlers from "./useDragEventHandlers";

type DndContextProps = {
    children: React.ReactNode;
};

function DndProvider({ children }: DndContextProps) {
    // We need to use an activationConstraint with a distance, because some draggable elements need
    // to handle click events as well.
    const pointerSensor = useSensor(PointerSensor, { activationConstraint: { distance: 3 } });
    // We use 'pointerWithin' collision detection strategy, so only pointer devices are allowed.
    const sensors = useSensors(pointerSensor);

    // On rare occassions the drag events are fired in a wrong order or don't fire at all.
    // This effect helps us recover from those bugs, when navigating to another page.
    const location = useLocation();
    useEffect(() => {
        document.body.classList.remove(dndClassNames.draggingInProgress);
        document.body.classList.remove(dndClassNames.draggingCancelled);
    }, [location]);

    const { onDragStart, onDragCancel, onDragEnd } = useDragEventHandlers();

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={pointerWithin}
            accessibility={{
                screenReaderInstructions: { draggable: "To pick up a draggable item, use your primary pointer." },
            }}
            onDragStart={onDragStart}
            onDragCancel={onDragCancel}
            onDragEnd={onDragEnd}
        >
            {children}

            <DraggingOverlay />
        </DndContext>
    );
}

export default DndProvider;
