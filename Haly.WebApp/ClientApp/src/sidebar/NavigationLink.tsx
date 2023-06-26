import React from "react";
import { NavLink } from "react-router-dom";

import { styled } from "../common/theme";

type NavigationLinkProps = {
    title: string;
    href: string;
    icon?: React.ReactNode;
};

function NavigationLink({ title, href, icon }: NavigationLinkProps) {
    return (
        <Link to={href}>
            <span aria-hidden>{icon}</span>
            <span>{title}</span>
        </Link>
    );
}

const Link = styled(NavLink, {
    color: "inherit",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "$600",
    textDecoration: "none",
    width: "100%",

    "&.active": {
        color: "$white",
    },

    svg: {
        minHeight: "$navIconSize",
        minWidth: "$navIconSize",
    },
});

export default NavigationLink;
