import { useDraggable as useDraggableKit } from "@dnd-kit/core";

import isPageUsingMouseDevice from "../common/isPageUsingMouseDevice";

export type DraggableData = {
    id: string;
    type: "playlist" | "album" | "table-row" | "streamed-track";
    title: string | [string, string];
    moveParams?: {
        fromPlaylistId: string;
    };
};

export type DraggableHookParams = {
    id: string;
    data: DraggableData;
};

// The 'dnd-kit' library is not the most performant one. Prefer using the 'Draggable' components to
// reduce unnecessary rerenders.
function useDraggable(params: DraggableHookParams | undefined) {
    const { attributes, listeners, setNodeRef } = useDraggableKit({
        id: params?.id ?? "n/a",
        data: params?.data,
        disabled: !params,
    });

    // Only allow dragging with mouse pointer; touch devices should only be used for scrolling.
    return params && isPageUsingMouseDevice()
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
