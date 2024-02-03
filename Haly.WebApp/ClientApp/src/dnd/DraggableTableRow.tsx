import React from "react";

import useDraggable, { DraggableHookParams } from "./useDraggable";

type DraggableTableRowProps = {
    onClick: (e: React.MouseEvent<HTMLTableRowElement>) => void;
    onContextMenu: (e: React.MouseEvent<HTMLTableRowElement>) => void;
    onDoubleClick?: (e: React.MouseEvent<HTMLTableRowElement>) => void;
    children: React.ReactNode;
    draggableParams?: DraggableHookParams;
    className?: string;
    style?: React.CSSProperties;
};

function DraggableTableRow({
    onClick,
    onContextMenu,
    onDoubleClick,
    children,
    draggableParams,
    className,
    style,
}: DraggableTableRowProps) {
    const { draggableRef, ...draggableProps } = useDraggable(
        draggableParams
            ? {
                  id: draggableParams.id,
                  data: draggableParams.data,
              }
            : undefined,
    );

    return (
        <tr
            ref={draggableRef}
            {...draggableProps}
            onClick={onClick}
            onContextMenu={onContextMenu}
            onDoubleClick={onDoubleClick}
            className={className}
            style={style}
        >
            {children}
        </tr>
    );
}

export default DraggableTableRow;
