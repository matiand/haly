import React from "react";
import { NavLink } from "react-router-dom";

import { styled } from "../common/theme";

function NavigationItem({ href, title, icon, onClick }: NavigationItemProps) {
    if (onClick) {
        return (
            <ListItem>
                <button onClick={onClick}>
                    {icon}
                    <span>{title}</span>
                </button>
            </ListItem>
        );
    }

    return (
        <ListItem>
            <NavLink to={href}>
                {icon}
                <span>{title}</span>
            </NavLink>
        </ListItem>
    );
}

const ListItem = styled("li", {
    padding: "0 $700",
    fontSize: "$300",
    color: "$grey100",
    display: "flex",

    "a, button": {
        width: "100%",
        display: "flex",
        alignItems: "center",
        gap: "$600",
        color: "inherit",
        textDecoration: "none",
        cursor: "inherit",

        "&.active": {
            color: "$white",
        },
    },

    button: {
        cursor: "inherit",
        background: "transparent",
        outline: "none",
        border: "none",
        padding: 0,
    },

    span: {
        overflow: "hidden",
        whiteSpace: "nowrap",
        textOverflow: "ellipsis",
    },

    svg: {
        minHeight: "$navIconSize",
        minWidth: "$navIconSize",
    },

    "&:hover": {
        color: "$white",
    },
});

type NavigationItemProps = {
    title: string;
    href: string;
    icon?: React.ReactNode;
    onClick?: () => void;
};

export default NavigationItem;
