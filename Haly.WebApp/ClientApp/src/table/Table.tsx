import { styled, theme } from "../common/theme";
import { dndSelectors } from "../dnd/dndStyles";
import * as Block from "../ui/block/Block";

export const Root = styled("table", {
    display: "block",
    userSelect: "none",

    "& th, td": {
        padding: 0,
    },

    "&.isSticky > thead": {
        background: "$black500",
        borderBottom: "1px solid $collectionTableHeadBorder",
        boxShadow: "0 -1px 0 0 $collectionTableStickyHead",
        position: "sticky",

        "& > tr": {
            borderBottom: "none",
        },
    },
});

export const Head = styled("thead", {
    $$height: `${theme.tables.headHeight}px`,

    background: "",
    display: "block",
    top: `${theme.sizes.upperMenuHeight}`,
    zIndex: "$collectionTableHead",
    margin: "0 -$700 $600",
    padding: "0 $700",

    "& > tr": {
        borderBottom: "1px solid $collectionTableHeadBorder",
        display: "grid",
        height: "$$height",
        padding: "0 $600",

        "& > th, & > th > button": {
            alignItems: "center",
            color: "$white700",
            display: "flex",
            fontSize: "$300",
            fontWeight: "500",
        },

        "& > th:nth-of-type(1)": {
            justifySelf: "end",
        },

        "& > th:last-of-type": {
            justifySelf: "end",
            marginRight: "$800",
        },
    },
});

export const Body = styled("tbody", {
    $$rowHeight: `${theme.tables.rowHeight}px`,

    display: "block",
    position: "relative",

    tr: {
        borderRadius: "4px",
        display: "grid",
        height: "$$rowHeight",
        padding: "0 $600",

        "& > td": {
            alignItems: "center",
            display: "flex",

            button: {
                opacity: 0,

                "&:focus-visible": {
                    opacity: 1,
                },
            },
        },

        "& > td:nth-of-type(1)": {
            justifySelf: "center",

            // Hide position and AnimatedMusicBars of TrackIndexCell when the play button is focused.
            "&:has(button:focus-visible) > div > :not(button)": {
                display: "none",
            },
        },

        "&.isDisabled": {
            td: {
                opacity: 0.4,
            },
        },

        "&.isListenedTo": {
            "& td:nth-of-type(1) > div > :not(button)": {
                color: "$primary400",
            },

            [`& td:nth-of-type(2) ${Block.Title}`]: {
                color: "$primary400",
            },
        },

        "&:hover": {
            background: "$trackHover",

            "& button": {
                opacity: 1,
            },

            "& a": {
                color: "$white800",
            },

            // Hide position and AnimatedMusicBars of TrackIndexCell.
            "& td:nth-of-type(1) > div > :not(button)": {
                display: "none",
            },
        },

        [`&&.isSelected, &&${dndSelectors.dragOrigin}`]: {
            background: "$trackSelected",

            "& a": {
                color: "$white800",
            },
        },

        "&&.isSelected": {
            // First row in the selection range.
            "&:has(+ .isSelected)": {
                borderRadius: "4px 4px 0 0",
            },

            // Middle rows of the selection range.
            "& + .isSelected": {
                borderRadius: 0,
            },

            // Last row of the selection range.
            "&:has(+ :not(.isSelected)), &:last-of-type": {
                borderBottomRightRadius: "4px",
                borderBottomLeftRadius: "4px",
            },
        },
    },
});
