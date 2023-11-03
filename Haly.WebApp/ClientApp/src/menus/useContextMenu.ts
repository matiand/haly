import { MouseEvent, useCallback, useState } from "react";

export type AnchorPointMenuProps = {
    state: "open" | "closed";
    anchorPoint: { x: number; y: number };
    onClose: () => void;
};

function useContextMenu() {
    const [isOpen, setOpen] = useState(false);
    const [anchorPoint, setAnchorPoint] = useState({
        x: 0,
        y: 0,
    });

    const onContextMenu = useCallback((e: MouseEvent) => {
        console.log("context menu");
        if (typeof document.hasFocus === "function" && !document.hasFocus()) return;

        e.preventDefault();
        setAnchorPoint({
            x: e.clientX,
            y: e.clientY,
        });
        setOpen(true);
    }, []);

    return {
        onContextMenu,
        menuProps: {
            state: isOpen ? "open" : "closed",
            anchorPoint,
            onClose: () => setOpen(false),
        } as AnchorPointMenuProps,
    };
}

export default useContextMenu;
