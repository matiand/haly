import { useAtomValue } from "jotai";
import { useCallback } from "react";

import { TrackDto } from "../../generated/haly";
import { pageContextIdAtom } from "../common/atoms/pageAtoms";
import { isTrackPausedAtom, playbackContextIdAtom, streamedTrackIdAtom } from "../common/atoms/playbackAtoms";

// You might notice that this type has the same values as ContextPlaybackState. This is just a
// coincidence and they may change in future.
export type TrackPlaybackState = "playing" | "paused" | "none";

function useTableRowPlaybackState() {
    const pageContextId = useAtomValue(pageContextIdAtom);
    const playbackContextId = useAtomValue(playbackContextIdAtom);
    const streamedTrackId = useAtomValue(streamedTrackIdAtom);
    const isPaused = useAtomValue(isTrackPausedAtom);

    return useCallback(
        (trackId: TrackDto["id"]): TrackPlaybackState => {
            if (pageContextId !== playbackContextId || !trackId) return "none";

            if (streamedTrackId === trackId) return isPaused ? "paused" : "playing";

            return "none";
        },
        [playbackContextId, pageContextId, streamedTrackId, isPaused],
    );
}

export default useTableRowPlaybackState;
