import React from "react";

import useDraggable from "./useDraggable";

type DraggableProps = {
    id: string;
    data: object;
    children: React.ReactNode;
};

function Draggable({ id, data, children }: DraggableProps) {
    const { draggableRef, ...props } = useDraggable({
        id,
        data,
    });

    return (
        <div ref={draggableRef} {...props}>
            {children}
        </div>
    );
}

export default Draggable;
