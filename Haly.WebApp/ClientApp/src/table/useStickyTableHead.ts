import { useInView } from "react-intersection-observer";

import { theme } from "../common/theme";

function useStickyTableHead() {
    const { ref, inView } = useInView({
        initialInView: true,
        rootMargin: `-${theme.tables.stickyHeadMargin}px 0px 0px 0px`,
    });

    return {
        ref,
        isSticky: !inView,
    };
}

export default useStickyTableHead;
