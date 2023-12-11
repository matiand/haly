import { useAtomValue } from "jotai";
import { useCallback } from "react";

import { isTrackPausedAtom, playbackContextIdAtom } from "../common/atoms/playbackAtoms";

export type ContextPlaybackState = "playing" | "paused" | "none";

function useContextPlaybackState() {
    const playbackContextId = useAtomValue(playbackContextIdAtom);
    const isPaused = useAtomValue(isTrackPausedAtom);

    return useCallback(
        (contextId: string, isLikedSongsCollection = false): ContextPlaybackState => {
            if (isLikedSongsCollection && playbackContextId === "collection") {
                return isPaused ? "paused" : "playing";
            }

            if (playbackContextId !== contextId) return "none";

            return isPaused ? "paused" : "playing";
        },
        [isPaused, playbackContextId],
    );
}

export default useContextPlaybackState;
