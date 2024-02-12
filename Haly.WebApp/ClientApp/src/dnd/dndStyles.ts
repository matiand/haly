export const dndClassNames = {
    draggingInProgress: "draggingInProgress",
    // onDragCancel handler of DndProvider adds the 'draggingCancelled' class to document.body.
    // This lets us skip the 'Escape' shortcut handler of useSelectionShortcuts when dragging is cancelled.
    draggingCancelled: "draggingCancelled",
    notDroppable: "notDroppable",
    isOverDroppableArea: "isOverDroppableArea",
    droppingWillMoveItem: "droppingWillMoveItem",
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

            [`&.${dndClassNames.droppingWillMoveItem}`]: {
                outline: "2px solid $secondary500",
            },
        },

        main: {
            pointerEvents: "none",
        },
    },

    [`${dndSelectors.draggableItem}`]: {
        // https://docs.dndkit.com/api-documentation/sensors/pointer#touch-action
        touchAction: "none",
        userSelect: "none",

        // If dragging is cancelled by pressing the Escape key, the browsers will show an outline on
        // the dragged item. Since these elements are only controlled by the mouse, it's advisable
        // to disable those styles.
        "&:focus-visible": {
            outline: "none",
        },
    },
};
