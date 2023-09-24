import { useAtomValue } from "jotai";
import { useCallback } from "react";

import { TrackDto } from "../../generated/haly";
import { isTrackPausedAtom, playbackContextIdAtom, streamedTrackIdAtom } from "../common/atoms";
import { PlaybackContextState } from "../common/usePlaybackContextState";

function useTableRowPlaybackState(contextId: string) {
    const playbackContextId = useAtomValue(playbackContextIdAtom);
    const streamedTrackId = useAtomValue(streamedTrackIdAtom);
    const isPaused = useAtomValue(isTrackPausedAtom);

    return useCallback(
        (trackId: TrackDto["spotifyId"]): PlaybackContextState => {
            if (playbackContextId !== contextId || !trackId) return "none";

            if (streamedTrackId === trackId) return isPaused ? "paused" : "playing";

            return "none";
        },
        [playbackContextId, contextId, streamedTrackId, isPaused],
    );
}

export default useTableRowPlaybackState;
