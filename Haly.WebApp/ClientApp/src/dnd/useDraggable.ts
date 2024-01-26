import { useDraggable as useDraggableKit } from "@dnd-kit/core";

export type DraggableData = {
    id: string;
    type: "playlist" | "album" | "table-row" | "streamed-track";
    title: string | [string, string];
};

type DraggableHookParams = {
    id: string;
    data: DraggableData;
};

function useDraggable(params: DraggableHookParams | undefined) {
    const { attributes, listeners, setNodeRef } = useDraggableKit({
        id: params?.id ?? "n/a",
        data: params?.data,
        disabled: !params,
    });

    return params
        ? {
              draggableRef: setNodeRef,
              ...listeners,
              ...attributes,
              // We don't allow keyboard dragging, so there is no need for tabIndex.
              tabIndex: -1,
          }
        : { draggableRef: undefined };
}

export default useDraggable;
