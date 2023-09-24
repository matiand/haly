import { styled, theme } from "../common/theme";

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

        "&.disabled > td": {
            opacity: 0.4,
        },

        "&&.isSelected": {
            background: "$trackSelected",
            "& a": {
                color: "$white800",
            },
        },

        "& > td": {
            alignItems: "center",
            display: "flex",

            "& button": {
                opacity: 0,
            },
        },

        "&:hover": {
            background: "$trackHover",
            // Hide index and AnimatedMusicBars of TrackIndexCell when hovered.
            "& td:nth-of-type(1) > div > span, & td:nth-of-type(1) > div > div": {
                display: "none",
            },

            "& a": {
                color: "$white800",
            },

            "& button": {
                opacity: 1,
            },
        },

        "& > td:nth-of-type(1)": {
            justifySelf: "center",
        },
    },
});
