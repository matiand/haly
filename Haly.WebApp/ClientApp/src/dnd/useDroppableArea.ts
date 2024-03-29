import { useDroppable as useDroppableKit } from "@dnd-kit/core";

import { dndClassNames } from "./dndStyles";
import { DraggableData } from "./useDraggable";

export type EmptyArea = {
    id: "library" | "backlog" | "library-plus";
    disabled: boolean;
    data?: never;
};

export type LibraryItemArea = {
    id: `library:${string}`;
    data: {
        id: string;
        type: "playlist";
    };
    disabled: boolean;
};

export type DroppableArea = EmptyArea | LibraryItemArea;
export type DroppableAreaId = DroppableArea["id"];

// The 'dnd-kit' library is not the most performant one. Prefer using the 'Droppable' components to
// reduce unnecessary rerenders.
function useDroppableArea(area: DroppableArea | undefined) {
    const disabled = area?.disabled ?? true;

    const { setNodeRef, isOver, active } = useDroppableKit({
        id: area?.id ?? "n/a",
        data: area?.data,
        disabled,
    });

    const item = active?.data.current as DraggableData | undefined;

    return {
        droppableRef: setNodeRef,
        classNames: {
            [`${dndClassNames.isOverDroppableArea}`]: isOver && !disabled,
            [`${dndClassNames.notDroppable}`]: disabled,
            [`${dndClassNames.droppingWillMoveItem}`]: isOver && item?.moveParams && area?.id.startsWith("library:"),
        },
    };
}

export default useDroppableArea;
