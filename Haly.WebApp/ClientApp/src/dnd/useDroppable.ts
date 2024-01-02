import { useDroppable as useDroppableKit } from "@dnd-kit/core";

import { dndClassNames } from "./dndStyles";

export type DroppableData = {
    id: string;
    type: "playlist" | "album" | "table-row" | "streamed-track";
};

type DroppableHookParams = {
    id: string;
    data: object | DroppableData;
    disabled?: boolean;
};

function useDroppable({ id, data, disabled }: DroppableHookParams) {
    const { setNodeRef, isOver } = useDroppableKit({
        id,
        data,
        disabled,
    });

    return {
        droppableRef: setNodeRef,
        classNames: {
            [`${dndClassNames.isOverDroppableArea}`]: isOver && !disabled,
            [`${dndClassNames.notDroppable}`]: disabled,
        },
    };
}

export default useDroppable;
