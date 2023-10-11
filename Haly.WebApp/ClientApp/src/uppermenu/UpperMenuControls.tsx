import PlaybackToggle from "../playback/PlaybackToggle";
import useContextPlaybackState from "../playback/useContextPlaybackState";
import { useContextPlaybackActions } from "../playback/usePlaybackActions";

type UpperMenuControlsProps = {
    contextId: string;
};

function UpperMenuControls({ contextId }: UpperMenuControlsProps) {
    const getPlaybackState = useContextPlaybackState();
    const playbackState = getPlaybackState(contextId);

    const { togglePlayback } = useContextPlaybackActions(playbackState);

    const isPaused = playbackState !== "playing";

    return <PlaybackToggle size="medium" isPaused={isPaused} toggle={togglePlayback} />;
}

export default UpperMenuControls;
