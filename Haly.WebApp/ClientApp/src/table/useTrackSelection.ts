import { useAtom } from "jotai";
import React, { useCallback } from "react";

import { selectedTrackIndicesAtom } from "../common/atoms";

function useTrackSelection(index: number) {
    const [trackIndices, setTrackIndices] = useAtom(selectedTrackIndicesAtom);

    const selectTrack: React.MouseEventHandler<HTMLTableRowElement> = useCallback(
        (event) => {
            if (event.ctrlKey || event.metaKey) {
                // Toggle selection of a single track when Ctrl (or Cmd on Mac) is pressed.
                setTrackIndices((prev) => {
                    if (prev.includes(index)) {
                        return prev.filter((i) => i !== index);
                    } else {
                        return [...prev, index];
                    }
                });
            } else if (event.shiftKey && trackIndices.length === 0) {
                // If Shift is pressed and no tracks are selected, select a range starting from the first track.
                setTrackIndices(new Array(index).fill(0).map((_, idx) => idx + 1));
            } else if (event.shiftKey && trackIndices.length > 0) {
                // If Shift is pressed and some tracks are already selected, add a range from the last selected track.

                const lastIndex = trackIndices.at(-1) as number;
                const start = Math.min(lastIndex, index);
                const end = Math.max(lastIndex, index);

                const indexRange = new Array(end - start + 1).fill(0).map((_, idx) => idx + start);
                const remainingIndices = trackIndices.filter((i) => !indexRange.includes(i));

                // We need to place the lastIndex at the end, for this to work properly.
                const finalIndices = indexRange
                    .concat(remainingIndices)
                    .filter((i) => i !== lastIndex)
                    .concat([lastIndex]);

                setTrackIndices(finalIndices);
            } else {
                // If no modifiers are pressed, toggle selection of only the clicked track.
                setTrackIndices((prev) => {
                    if (prev.includes(index)) {
                        return [];
                    } else {
                        return [index];
                    }
                });
            }
        },
        [index, setTrackIndices, trackIndices],
    );

    return {
        isSelected: trackIndices.includes(index),
        selectTrack,
    };
}

export default useTrackSelection;
