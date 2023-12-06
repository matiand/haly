import React, { useCallback, useRef } from "react";
import { useResizeDetector } from "react-resize-detector";

// Find the biggest font size that fits the contents of an element in a single line.
function useResizableFont(fontSizesDescending: number[]) {
    const resizableRef = useRef<HTMLHeadingElement>();

    const onResize = useCallback(() => {
        const node = resizableRef.current;
        if (!node) return;

        node.style.setProperty("visibility", "hidden");

        // Find the biggest font size that fits our criteria.
        for (let i = 0; i < fontSizesDescending.length; i++) {
            const base = fontSizesDescending[i];
            const heightLimit = (base + base * 0.08 + base * 0.12) * 1.5;

            node.style.setProperty("font-size", `${base}px`);

            const newHeight = node.getBoundingClientRect().height;

            if (newHeight <= heightLimit) break;
        }

        node.style.setProperty("visibility", "visible");
    }, [fontSizesDescending]);

    useResizeDetector({
        targetRef: resizableRef as React.MutableRefObject<HTMLHeadingElement>,
        onResize,
    });

    return { resizableRef };
}

export default useResizableFont;
