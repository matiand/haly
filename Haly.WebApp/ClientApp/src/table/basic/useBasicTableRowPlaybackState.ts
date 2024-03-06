import { useAtomValue } from "jotai/index";
import { useCallback } from "react";

import { TrackDto } from "../../../generated/haly";
import { isTrackPausedAtom, streamedPlaybackIdAtom } from "../../common/atoms/playbackAtoms";
import { TrackPlaybackState } from "../useTableRowPlaybackState";

function useBasicTableRowPlaybackState() {
    const streamedPlaybackId = useAtomValue(streamedPlaybackIdAtom);
    const isPaused = useAtomValue(isTrackPausedAtom);

    return useCallback(
        (playbackId: PlaybackId): TrackPlaybackState =>
            streamedPlaybackId === playbackId ? (isPaused ? "paused" : "playing") : "none",
        [isPaused, streamedPlaybackId],
    );
}

type PlaybackId = TrackDto["playbackId"];

export default useBasicTableRowPlaybackState;
