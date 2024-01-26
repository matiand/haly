import { useCallback } from "react";

function useMainScrollArea() {
    return useCallback(() => document.querySelector("main div[data-overlayscrollbars-viewport]"), []);
}

export default useMainScrollArea;
