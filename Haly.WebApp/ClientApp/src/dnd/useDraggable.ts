import { useDraggable as useDraggableKit } from "@dnd-kit/core";

type DraggableHookParams = {
    id: string;
    data: object;
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
