import { useAtomValue } from "jotai";
import { useCallback } from "react";

import { isTrackPausedAtom, playbackUriAtom } from "../common/atoms/playbackAtoms";

export type ContextPlaybackState = "playing" | "paused" | "none";

function useContextPlaybackState() {
    const playbackUri = useAtomValue(playbackUriAtom);
    const isPaused = useAtomValue(isTrackPausedAtom);

    return useCallback(
        (contextUri: string): ContextPlaybackState => {
            if (playbackUri !== contextUri) return "none";

            return isPaused ? "paused" : "playing";
        },
        [isPaused, playbackUri],
    );
}

export default useContextPlaybackState;
