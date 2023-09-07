import { useEffect, useState } from "react";

export function useDelayedRender(delayInMs = 800) {
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setIsReady(true), delayInMs);

        return () => clearTimeout(timer);
    }, [delayInMs]);

    return isReady;
}
