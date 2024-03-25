// Taken from https://stackoverflow.com/a/68742668
import { useAtom } from "jotai/index";
import { PointerEventHandler, useCallback, useEffect, useState } from "react";

import { persistedSidebarWidthAtom } from "../common/atoms/pageAtoms";

type UseResizeProps = {
    minWidth: number;
    maxWidth: number;
};

const useSidebarResize = ({ minWidth, maxWidth }: UseResizeProps) => {
    const [isResizing, setIsResizing] = useState(false);
    const [width, setSidebarWidth] = useAtom(persistedSidebarWidthAtom);

    const enableResize = useCallback<PointerEventHandler<HTMLElement>>(
        (e) => {
            const isCloseToResizer = e.clientX - width <= 15 && e.clientX - width >= 3;
            if (isCloseToResizer) {
                setIsResizing(true);
            }
        },
        [width, setIsResizing],
    );

    const disableResize = useCallback(() => {
        setIsResizing(false);
    }, [setIsResizing]);

    const resize = useCallback(
        (e: PointerEvent) => {
            if (isResizing) {
                const newWidth = e.clientX;
                if (newWidth >= minWidth && newWidth <= maxWidth) {
                    setSidebarWidth(newWidth);
                }
            }
        },
        [minWidth, maxWidth, isResizing, setSidebarWidth],
    );

    useEffect(() => {
        if (isResizing) {
            document.addEventListener("pointermove", resize);
            document.addEventListener("pointerup", disableResize);

            return () => {
                document.removeEventListener("pointermove", resize);
                document.removeEventListener("pointerup", disableResize);
            };
        }
    }, [disableResize, isResizing, resize]);

    return {
        width,
        enableResize,
    };
};

export default useSidebarResize;
