import { useMemo } from "react";

function useMainScrollArea() {
    return useMemo(() => document.querySelector("main div[data-overlayscrollbars-viewport]"), []);
}

export default useMainScrollArea;
