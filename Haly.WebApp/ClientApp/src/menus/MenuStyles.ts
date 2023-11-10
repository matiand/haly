import { ControlledMenu } from "@szhsin/react-menu";
import { menuDividerSelector, menuItemSelector, menuSelector, submenuSelector } from "@szhsin/react-menu/style-utils";

import { styled } from "../common/theme";

export const StyledMenu = styled(ControlledMenu, {
    [`${menuSelector.name}`]: {
        // todo: remove this, please
        // "&&&": { display: "unset !important" },
        background: "$black200",
        boxShadow: "0px 12px 20px $moreOptionsMenuMajor, 0px 4px 6px $moreOptionsMenuMinor",
        borderRadius: "4px",
        fontSize: "$200",
        fontWeight: 500,
        minWidth: "200px",
        maxWidth: "350px",
        maxHeight: "calc(100vh - 24px)",
        padding: "$200",
        userSelect: "none",
        zIndex: "$menu",
    },

    [`${menuItemSelector.name}`]: {
        alignItems: "center",
        borderRadius: "2px",
        color: "$menuItemText",
        cursor: "default",
        display: "flex",
        height: "40px",
        justifyContent: "space-between",
        outline: "none",
        padding: "$500",

        [`&${menuItemSelector.focusable}`]: {
            padding: 0,
        },
    },

    [`${submenuSelector.name} > :first-child:after`]: {
        content: "''",
        borderTop: "solid 5px transparent",
        borderLeft: "solid 6px $white800",
        borderBottom: "solid 5px transparent",
        height: 0,
        marginLeft: "auto",
        marginRight: "$200",
        width: 0,
    },

    [`${menuDividerSelector.name}`]: {
        backgroundColor: "$black100",
        height: "1px",
        padding: "0",
    },

    [`${menuItemSelector.hover}:not(${menuItemSelector.focusable})`]: {
        backgroundColor: "$trackHover",
        outline: 0,
    },

    input: {
        background: "rgba(255, 255, 255, .1)",
        border: "none",
        borderRadius: "4px",
        color: "rgba(255, 255, 255, .7)",
        padding: "$400 $500",
        width: "100%",

        "&::placeholder": {
            color: "rgba(255, 255, 255, .7)",
        },
    },
});
