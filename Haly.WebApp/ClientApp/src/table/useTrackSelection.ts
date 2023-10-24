import { useAtom, useAtomValue } from "jotai";
import React, { useCallback, useEffect } from "react";

import { AlbumTrackDto, TrackDto } from "../../generated/haly";
import { pageContextIdAtom, playlistSearchTermAtom, selectedTracksAtom } from "../common/atoms";

function useTrackSelection(items: (TrackDto | AlbumTrackDto)[]) {
    const [selectedTracks, setSelectedTracks] = useAtom(selectedTracksAtom);

    const pageContextId = useAtomValue(pageContextIdAtom);
    const searchTerm = useAtomValue(playlistSearchTermAtom);

    useEffect(() => {
        setSelectedTracks([]);
    }, [pageContextId, searchTerm, setSelectedTracks]);

    const selectTrack = useCallback(
        (index: number) => (event: React.MouseEvent<HTMLTableRowElement>) => {
            if (event.ctrlKey || event.metaKey) {
                // Add or remove from selection a single track when Ctrl (or Cmd on Mac) is pressed.
                setSelectedTracks((prev) => {
                    if (prev.some((i) => i.index === index)) {
                        return prev.filter((i) => i.index !== index);
                    } else {
                        return [
                            ...prev,
                            {
                                index,
                                id: items[index].id,
                            },
                        ];
                    }
                });
            } else if (event.shiftKey && selectedTracks.length === 0) {
                // If Shift is pressed and no tracks are selected, select a range starting from the first track.
                const selection = items
                    .filter((_, idx) => idx <= index)
                    .map((item, idx) => ({
                        index: idx,
                        id: item.id,
                    }));
                setSelectedTracks(selection);
            } else if (event.shiftKey && selectedTracks.length > 0) {
                // If Shift is pressed and some tracks are already selected, add a range from the last selected track.
                const lastIndex = selectedTracks.at(-1)!.index;
                const start = Math.min(lastIndex, index);
                const end = Math.max(lastIndex, index);

                const indexRange = new Array(end - start + 1).fill(0).map((_, idx) => idx + start);
                const remainingIndices = selectedTracks
                    .filter((i) => !indexRange.includes(i.index))
                    .map((i) => i.index);

                // We need to place the lastIndex at the end, for this to work properly.
                const finalIndices = indexRange
                    .concat(remainingIndices)
                    .filter((i) => i !== lastIndex)
                    .concat([lastIndex]);

                const selection = finalIndices.map((i) => ({
                    index: i,
                    id: items[i].id,
                }));

                setSelectedTracks(selection);
            } else {
                // If no modifiers are pressed, create a new selection with only the clicked track.
                setSelectedTracks((prev) => {
                    if (prev.some((i) => i.index === index)) {
                        return [];
                    } else {
                        return [
                            {
                                index,
                                id: items[index].id,
                            },
                        ];
                    }
                });
            }
        },
        [items, selectedTracks, setSelectedTracks],
    );

    return {
        isSelectedRow: (index: number) => selectedTracks.some((i) => i.index === index),
        selectTableRow: (index: number) => selectTrack(index),
    };
}

export default useTrackSelection;
