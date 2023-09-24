import { useEffect, useRef } from "react";

// Scroll to track row on its initial render.
function useScrollToTrack() {
    const ref = useRef<HTMLTableRowElement>(null);

    useEffect(() => {
        ref.current?.scrollIntoView({ block: "center" });
    }, []);

    return ref;
}

export default useScrollToTrack;
