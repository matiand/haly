import { useSetAtom } from "jotai/index";
import { useInView } from "react-intersection-observer";

import { pageHeaderVisibilityAtom } from "./atoms/pageAtoms";

// This hook observes how much of the page header is visible. We use it to show the contents of
// UpperMenu when the user scrolls down the page.
function usePageHeaderVisibility() {
    const setPageHeaderVisibility = useSetAtom(pageHeaderVisibilityAtom);
    const { ref } = useInView({
        threshold: [0.9, 0.8, 0.7, 0.6, 0.5, 0.4, 0.3, 0.2, 0.1, 0],
        onChange: (_, entry) => {
            setPageHeaderVisibility(entry.intersectionRatio);
        },
    });

    return { ref };
}

export default usePageHeaderVisibility;
