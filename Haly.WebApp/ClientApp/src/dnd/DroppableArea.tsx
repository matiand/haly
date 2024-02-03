import clsx from "clsx";
import React from "react";

import useDroppableArea, { EmptyArea } from "./useDroppableArea";

type DroppableAreaProps = {
    area: EmptyArea;
    children: React.ReactNode;
    style?: React.CSSProperties;
};

function DroppableArea({ area, children, style }: DroppableAreaProps) {
    const { droppableRef, classNames: dndClassNames } = useDroppableArea({
        id: area.id,
        disabled: false,
    });

    return (
        <div ref={droppableRef} style={style} className={clsx({ ...dndClassNames })}>
            {children}
        </div>
    );
}

export default DroppableArea;
