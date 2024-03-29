import { useAtomValue } from "jotai";

import { pageHeaderVisibilityAtom } from "../common/atoms/pageAtoms";

function useDynamicUpperMenuContent() {
    const pageHeaderVisibility = useAtomValue(pageHeaderVisibilityAtom);

    let opacity;
    if (pageHeaderVisibility > 0.65) {
        opacity = 0;
    } else if (pageHeaderVisibility > 0.6) {
        opacity = 0.05;
    } else if (pageHeaderVisibility > 0.5) {
        opacity = 0.25;
    } else if (pageHeaderVisibility > 0.4) {
        opacity = 0.6;
    } else if (pageHeaderVisibility > 0.3) {
        opacity = 0.9;
    } else {
        opacity = 1;
    }

    return { opacity, isContentVisible: pageHeaderVisibility === 0 };
}

export default useDynamicUpperMenuContent;
