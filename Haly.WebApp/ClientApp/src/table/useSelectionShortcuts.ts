import { useAtom } from "jotai";
import { useAtomValue } from "jotai/index";
import { useEffect } from "react";

import { AlbumTrackDto, PlaylistTrackDto } from "../../generated/haly";
import { pageContextAtom } from "../common/atoms/pageAtoms";
import { selectedTracksAtom } from "../common/atoms/trackAtoms";
import useRemoveFromPlaylistMutation from "../playlist/useRemoveFromPlaylistMutation";

function useSelectionShortcuts(items: (AlbumTrackDto | PlaylistTrackDto)[]) {
    const pageContext = useAtomValue(pageContextAtom);
    const [selectedTracks, setSelectedTracks] = useAtom(selectedTracksAtom);

    const removeFromPlaylist = useRemoveFromPlaylistMutation();

    useEffect(() => {
        const keyHandler = (e: KeyboardEvent) => {
            if ((e.ctrlKey || e.metaKey) && e.key === "a") {
                e.preventDefault();

                const wholeSelection = items.map((i, index: number) => ({
                    index,
                    track: i,
                }));

                setSelectedTracks(wholeSelection);
            }
        };

        window.addEventListener("keydown", keyHandler);

        return () => window.removeEventListener("keydown", keyHandler);
    }, [items, setSelectedTracks]);

    useEffect(() => {
        const keyHandler = (e: KeyboardEvent) => {
            if (e.key === "Delete" || e.key === "Backspace") {
                e.preventDefault();

                if (pageContext?.allow?.removeTrackFromPlaylist && selectedTracks.length > 0) {
                    removeFromPlaylist.mutate({
                        playlistId: pageContext.id,
                        tracks: selectedTracks.map((t) => ({
                            uri: t.track.uri!,
                            position: (t.track as PlaylistTrackDto).positionInPlaylist,
                        })),
                    });

                    setSelectedTracks([]);
                }
            }
        };

        window.addEventListener("keydown", keyHandler);

        return () => window.removeEventListener("keydown", keyHandler);
    }, [items, pageContext, removeFromPlaylist, selectedTracks, setSelectedTracks]);
}

export default useSelectionShortcuts;
