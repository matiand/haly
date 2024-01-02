export const dndClassNames = {
    draggingInProgress: "draggingInProgress",
    notDroppable: "notDroppable",
    isOverDroppableArea: "isOverDroppableArea",
};

export const dndSelectors = {
    dragOrigin: "[aria-pressed=true]",
};

export const dndStyles = {
    [`.${dndClassNames.draggingInProgress}`]: {
        [`.${dndClassNames.notDroppable}`]: {
            opacity: 0.33,
        },

        [`.${dndClassNames.isOverDroppableArea}`]: {
            outline: "2px solid $primary300",
        },

        // todo: currently buggy, try again
        // "*:hover": {
        //     color: "initial !important",
        //     background: "initial !important",
        // }
    },
};
