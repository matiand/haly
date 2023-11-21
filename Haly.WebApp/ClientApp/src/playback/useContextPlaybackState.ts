import { useAtomValue } from "jotai";
import { useCallback } from "react";

import { isTrackPausedAtom, playbackContextIdAtom } from "../common/atoms/playbackAtoms";

export type ContextPlaybackState = "playing" | "paused" | "none";

function useContextPlaybackState() {
    const playbackContextId = useAtomValue(playbackContextIdAtom);
    const isPaused = useAtomValue(isTrackPausedAtom);

    return useCallback(
        (contextId: string): ContextPlaybackState => {
            if (playbackContextId !== contextId) return "none";

            return isPaused ? "paused" : "playing";
        },
        [isPaused, playbackContextId],
    );
}

export default useContextPlaybackState;
