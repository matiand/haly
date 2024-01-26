import clsx from "clsx";
import React from "react";
import { NavLink } from "react-router-dom";

import { styled } from "../common/theme";
import useDroppableArea, { DroppableAreaId } from "../dnd/useDroppableArea";

type NavigationListItemProps = {
    title: string;
    href: string;
    icon: React.ReactNode;
    areaId?: Exclude<DroppableAreaId, `library:${string}`>;
};

function NavigationListItem({ title, href, icon, areaId }: NavigationListItemProps) {
    const { droppableRef, classNames: dndClassNames } = useDroppableArea(
        areaId && {
            id: areaId,
            disabled: false,
        },
    );

    return (
        <li>
            <Anchor ref={droppableRef} className={clsx(dndClassNames)} to={href}>
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
