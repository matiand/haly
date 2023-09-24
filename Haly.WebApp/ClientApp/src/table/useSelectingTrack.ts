import { useAtom } from "jotai";

import { TrackDto } from "../../generated/haly";
import { selectedTrackIdAtom } from "../common/atoms";

function useSelectingTrack(trackId: TrackDto["spotifyId"]) {
    const [selectedTrackId, setSelectedTrackId] = useAtom(selectedTrackIdAtom);

    // We don't allow selecting 'local' tracks. They don't have an id.
    const selectTrack = () => {
        if (trackId) {
            setSelectedTrackId(trackId);
        }
    };

    return {
        isSelected: !!trackId && trackId === selectedTrackId,
        selectTrack,
    };
}

export default useSelectingTrack;
