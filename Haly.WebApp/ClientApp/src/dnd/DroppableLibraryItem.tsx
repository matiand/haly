import clsx from "clsx";
import React from "react";
import { NavLink } from "react-router-dom";

import useDroppableArea, { LibraryItemArea } from "./useDroppableArea";

type DroppableLibraryItemProps = {
    href: string;
    area: LibraryItemArea | undefined;
    children: React.ReactNode;
};

function DroppableLibraryItem({ href, area, children }: DroppableLibraryItemProps) {
    const { droppableRef, classNames: dndClassNames } = useDroppableArea(area);

    return (
        <NavLink ref={droppableRef} className={clsx({ ...dndClassNames })} to={href}>
            {children}
        </NavLink>
    );
}

export default DroppableLibraryItem;
