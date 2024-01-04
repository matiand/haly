export const dndClassNames = {
    draggingInProgress: "draggingInProgress",
    // onDragCancel handler of DndProvider adds the 'draggingCancelled' class to document.body.
    // This lets us skip the 'Escape' shortcut handler of useSelectionShortcuts when dragging is cancelled.
    draggingCancelled: "draggingCancelled",
    notDroppable: "notDroppable",
    isOverDroppableArea: "isOverDroppableArea",
};

export const dndSelectors = {
    dragOrigin: "[aria-pressed=true]",
    draggableItem: "[aria-roledescription=draggable]",
};

export const dndStyles = {
    [`.${dndClassNames.draggingInProgress}`]: {
        [`.${dndClassNames.notDroppable}`]: {
            opacity: 0.33,
        },

        [`.${dndClassNames.isOverDroppableArea}`]: {
            outline: "2px solid $primary300",
        },

        main: {
            pointerEvents: "none",
        },
    },

    [`${dndSelectors.draggableItem}`]: {
        // https://docs.dndkit.com/api-documentation/sensors/pointer#touch-action
        touchAction: "none",
        userSelect: "none",
    },
};
