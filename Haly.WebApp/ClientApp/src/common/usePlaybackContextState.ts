import { useAtomValue } from "jotai";
import { useCallback } from "react";

import { isTrackPausedAtom, playbackContextIdAtom, streamedTrackIdAtom } from "./atoms";

export type PlaybackContextState = "playing" | "paused" | "none";

function usePlaybackContextState() {
    const playbackContextId = useAtomValue(playbackContextIdAtom);
    const streamedTrackId = useAtomValue(streamedTrackIdAtom);
    const isPaused = useAtomValue(isTrackPausedAtom);

    return useCallback(
        (id: string) => {
            if (playbackContextId !== id) return "none";
            if (!streamedTrackId) return "none";

            return isPaused ? "paused" : "playing";
        },
        [isPaused, playbackContextId, streamedTrackId],
    );
}

export default usePlaybackContextState;
