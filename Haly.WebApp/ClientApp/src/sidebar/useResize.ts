// Taken from https://stackoverflow.com/a/68742668
import { MouseEventHandler, useCallback, useEffect, useState } from "react";

type UseResizeProps = {
    initialWidth: number;
    minWidth: number;
    maxWidth: number;
};

const useResize = ({ minWidth, maxWidth, initialWidth }: UseResizeProps) => {
    const [isResizing, setIsResizing] = useState(false);
    const [width, setWidth] = useState(initialWidth);

    const enableResize = useCallback<MouseEventHandler<HTMLElement>>(
        (e) => {
            const isCloseToResizer = e.clientX - width <= 12 && e.clientX - width >= 3;
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
        (e: MouseEvent) => {
            if (isResizing) {
                const newWidth = e.clientX;
                if (newWidth >= minWidth && newWidth <= maxWidth) {
                    setWidth(newWidth);
                }
            }
        },
        [minWidth, maxWidth, isResizing, setWidth],
    );

    useEffect(() => {
        if (isResizing) {
            document.addEventListener("mousemove", resize);
            document.addEventListener("mouseup", disableResize);

            return () => {
                document.removeEventListener("mousemove", resize);
                document.removeEventListener("mouseup", disableResize);
            };
        }
    }, [disableResize, isResizing, resize]);

    return {
        width,
        enableResize,
    };
};

export default useResize;
