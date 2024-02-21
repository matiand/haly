import { useSetAtom } from "jotai/index";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

import { pageHeaderVisibilityAtom } from "./atoms/pageAtoms";

// todo: A hook that manages (what?)
function usePageHeaderVisibility() {
    const setPageHeaderVisibility = useSetAtom(pageHeaderVisibilityAtom);
    const { ref } = useInView({
        threshold: [0.9, 0.8, 0.7, 0.6, 0.5, 0.4, 0.3, 0.2, 0.1, 0],
        onChange: (_, entry) => {
            setPageHeaderVisibility(entry.intersectionRatio);
        },
    });

    useEffect(() => {
        return () => setPageHeaderVisibility(1);
    }, [setPageHeaderVisibility]);

    return { ref };
}

export default usePageHeaderVisibility;
