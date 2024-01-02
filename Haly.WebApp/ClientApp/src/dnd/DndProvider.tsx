import { DndContext, PointerSensor, pointerWithin, useSensor, useSensors } from "@dnd-kit/core";
import { useAtomValue } from "jotai/index";
import React from "react";

import { selectedTracksAtom } from "../common/atoms/trackAtoms";
import { dndClassNames } from "./dndStyles";
import DraggingOverlay from "./DraggingOverlay";

type DndContextProps = {
    children: React.ReactNode;
};

function DndProvider({ children }: DndContextProps) {
    // We use 'pointerWithin' collision detection strategy, so only pointer devices are allowed.
    const pointerSensor = useSensor(PointerSensor, { activationConstraint: { distance: 2 } });
    // const pointerSensor = useSensor(PointerSensor);
    const sensors = useSensors(pointerSensor);
    const selectedTracks = useAtomValue(selectedTracksAtom);

    console.log("DndProvider rerender");

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={pointerWithin}
            accessibility={{
                screenReaderInstructions: { draggable: "To pick up a draggable item, use your primary pointer." },
            }}
            onDragStart={(e) => {
                console.log("drag has started", e);
                document.body.classList.add(dndClassNames.draggingInProgress);
            }}
            onDragEnd={(e) => {
                document.body.classList.remove(dndClassNames.draggingInProgress);

                if (e.over) {
                    console.log("Dropped at:", e);
                    // console.log("Dropped at:", e.over.id);
                } else {
                    console.log("Dropped at:", e);
                }

                if (e.over?.id === "create-playlist-area") {
                    console.log("Create new playlist for:", e.active.data.current);
                }
            }}
            onDragCancel={(e) => {
                document.body.classList.remove(dndClassNames.draggingInProgress);
            }}
        >
            {children}

            <DraggingOverlay />
        </DndContext>
    );
}

export default DndProvider;
