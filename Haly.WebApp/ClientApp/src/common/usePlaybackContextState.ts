import { useAtomValue } from "jotai";
import { useCallback } from "react";

import { isTrackPausedAtom, playbackContextIdAtom } from "./atoms";

export type PlaybackContextState = "playing" | "paused" | "none";

function usePlaybackContextState() {
    const playbackContextId = useAtomValue(playbackContextIdAtom);
    const isPaused = useAtomValue(isTrackPausedAtom);

    return useCallback(
        (id: string) => {
            if (playbackContextId !== id) return "none";

            return isPaused ? "paused" : "playing";
        },
        [isPaused, playbackContextId],
    );
}

export default usePlaybackContextState;
