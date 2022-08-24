// Taken from https://stackoverflow.com/a/68742668
import { useCallback, useEffect, useState } from "react";

type UseResizeProps = {
    defaultWidth: number;
    minWidth: number;
    maxWidth: number;
};

const useResize = ({ minWidth, maxWidth, defaultWidth }: UseResizeProps) => {
    const [isResizing, setIsResizing] = useState(false);
    const [width, setWidth] = useState(defaultWidth);

    const enableResize = useCallback(() => {
        setIsResizing(true);
    }, [setIsResizing]);

    const disableResize = useCallback(() => {
        setIsResizing(false);
    }, [setIsResizing]);

    const resize = useCallback(
        (e: MouseEvent) => {
            if (isResizing) {
                const newWidth = e.clientX; // You may want to add some offset here from props
                if (newWidth >= minWidth && newWidth <= maxWidth) {
                    setWidth(newWidth);
                }
            }
        },
        [minWidth, maxWidth, isResizing, setWidth],
    );

    useEffect(() => {
        document.addEventListener("mousemove", resize);
        document.addEventListener("mouseup", disableResize);

        return () => {
            document.removeEventListener("mousemove", resize);
            document.removeEventListener("mouseup", disableResize);
        };
    }, [disableResize, resize]);

    return { width, enableResize };
};

export default useResize;
