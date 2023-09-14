import { useEffect, useRef } from "react";

// Scroll to track row on its initial render.
function useScrollToTrack() {
    const ref = useRef<HTMLTableRowElement>(null);

    useEffect(() => {
        if (ref.current) {
            console.log("scroll leviosa", ref.current.getBoundingClientRect().x);
            // delay(200).then(() => ref.current?.scrollIntoView({block: "center"}));
            ref.current?.scrollIntoView({ block: "center" });
        }
    }, []);

    return ref;
}

export default useScrollToTrack;
