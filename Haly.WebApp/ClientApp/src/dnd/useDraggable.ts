import { useDraggable as useDraggableKit } from "@dnd-kit/core";

export type DraggableData = {
    type: "playlist" | "album" | "table-row" | "streamed-track";
    id: string;
    title: string | [string, string];
};

type DraggableHookParams = {
    id: string;
    data: DraggableData;
};

function useDraggable({ id, data }: DraggableHookParams) {
    const { attributes, listeners, setNodeRef } = useDraggableKit({
        id,
        data,
    });

    return {
        draggableRef: setNodeRef,
        ...listeners,
        ...attributes,
    };
}

export default useDraggable;
