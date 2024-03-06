import { useAtomValue } from "jotai";

import { pageContextUriAtom } from "../common/atoms/pageAtoms";
import PlaybackToggle from "../playback/PlaybackToggle";
import useContextPlaybackState from "../playback/useContextPlaybackState";
import { useContextPlayback } from "../playback/usePlaybackMutations";

function UpperMenuControls() {
    const uri = useAtomValue(pageContextUriAtom);

    const getPlaybackState = useContextPlaybackState();
    const playbackState = getPlaybackState(uri);
    const { togglePlayback } = useContextPlayback({
        contextUri: uri,
        playbackState,
    });

    const isPaused = playbackState !== "playing";

    return <PlaybackToggle size="medium" isPaused={isPaused} toggle={togglePlayback} />;
}

export default UpperMenuControls;
