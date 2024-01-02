import clsx from "clsx";
import React from "react";
import { NavLink } from "react-router-dom";

import { styled } from "../common/theme";
import useDroppable from "../dnd/useDroppable";

type NavigationListItemProps = {
    title: string;
    href: string;
    icon: React.ReactNode;
    droppableAreaId?: string;
};

function NavigationListItem({ title, href, icon, droppableAreaId }: NavigationListItemProps) {
    const { droppableRef, classNames: dndClassNames } = useDroppable({
        id: droppableAreaId ?? title,
        data: {
            type: "" as unknown,
        },
        disabled: !droppableAreaId,
    });

    return (
        <li ref={droppableRef}>
            <Anchor className={clsx({ ...dndClassNames })} to={href}>
                <span aria-hidden>{icon}</span>
                <span>{title}</span>
            </Anchor>
        </li>
    );
}

const Anchor = styled(NavLink, {
    alignItems: "center",
    borderRadius: "4px",
    color: "inherit",
    cursor: "pointer",
    display: "flex",
    flexGrow: 1,
    gap: "$600",
    padding: "0 $400",
    textDecoration: "none",

    "&.active": {
        color: "$white800",
    },

    svg: {
        minHeight: "$navIconSize",
        minWidth: "$navIconSize",
    },
});

export default NavigationListItem;
