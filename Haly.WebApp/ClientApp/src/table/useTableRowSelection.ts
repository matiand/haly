import { useAtom, useAtomValue } from "jotai";
import React, { useCallback, useEffect } from "react";

import { AlbumTrackDto, PlaylistTrackDto, TrackDto } from "../../generated/haly";
import { pageContextIdAtom } from "../common/atoms/pageAtoms";
import { playlistSearchTermAtom } from "../common/atoms/playlistAtoms";
import { selectedTracksAtom } from "../common/atoms/trackAtoms";

function useTableRowSelection(items: (TrackDto | AlbumTrackDto | PlaylistTrackDto)[]) {
    const [selectedTracks, setSelectedTracks] = useAtom(selectedTracksAtom);

    const pageContextId = useAtomValue(pageContextIdAtom);
    const searchTerm = useAtomValue(playlistSearchTermAtom);

    useEffect(() => {
        setSelectedTracks([]);
    }, [pageContextId, searchTerm, setSelectedTracks]);

    const selectTrack = useCallback(
        (index: number, event: React.MouseEvent<HTMLTableRowElement>) => {
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
                                track: items[index],
                            },
                        ];
                    }
                });
            } else if (event.shiftKey) {
                setSelectedTracks((prev) => {
                    // If Shift is pressed and no tracks are selected, select a range starting from the first track.
                    if (prev.length === 0) {
                        return items
                            .filter((_, idx) => idx <= index)
                            .map((item, idx) => ({
                                index: idx,
                                track: item,
                            }));
                    }

                    // If Shift is pressed and some tracks are already selected, add a range from the last selected track.
                    const lastIndex = prev.at(-1)!.index;
                    const start = Math.min(lastIndex, index);
                    const end = Math.max(lastIndex, index);

                    const indexRange = new Array(end - start + 1).fill(0).map((_, idx) => idx + start);
                    const remainingIndices = prev.filter((i) => !indexRange.includes(i.index)).map((i) => i.index);

                    // We need to place the lastIndex at the end, for this to work properly.
                    const finalIndices = indexRange
                        .concat(remainingIndices)
                        .filter((i) => i !== lastIndex)
                        .concat([lastIndex]);

                    return finalIndices.map((idx) => ({
                        index: idx,
                        track: items[idx],
                    }));
                });
            } else {
                // If no modifiers are pressed, create a new selection with only the clicked track.
                setSelectedTracks((prev) => {
                    if (prev.some((i) => i.index === index)) {
                        return [];
                    } else {
                        return [
                            {
                                index,
                                track: items[index],
                            },
                        ];
                    }
                });
            }
        },
        [items, setSelectedTracks],
    );

    return {
        isSelectedRow: (index: number) => selectedTracks.some((i) => i.index === index),
        selectTableRow: selectTrack,
    };
}

export default useTableRowSelection;
