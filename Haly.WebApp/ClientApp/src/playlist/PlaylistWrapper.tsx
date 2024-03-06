import { useMutation } from "@tanstack/react-query";
import { useSetAtom } from "jotai";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

import { selectedTracksAtom } from "../common/atoms/trackAtoms";
import halyClient from "../halyClient";
import LoadingIndicator from "../ui/LoadingIndicator";
import Playlist from "./Playlist";
import useIsPlaylistInLibrary from "./useIsPlaylistInLibrary";
import { usePlaylistSortOrder } from "./usePlaylistSortOrder";

function PlaylistWrapper() {
    const { id } = useParams();
    const { sortOrder } = usePlaylistSortOrder(id!, false);
    const isInLibrary = useIsPlaylistInLibrary(id!);
    const syncPlaylist = useMutation(["syncPlaylist", id!], () => halyClient.playlists.putPlaylist({ id: id! }), {
        retry: 1,
        retryDelay: 1000,
    });

    // Playlists that belong to the current user's library (i.e. those in the sidebar) are synced
    // automatically. For those that are not, we sync them manually.
    useEffect(() => {
        if (!isInLibrary && syncPlaylist.isIdle) {
            syncPlaylist.mutate();
        }
    }, [isInLibrary, syncPlaylist]);

    const setSelectedTracks = useSetAtom(selectedTracksAtom);
    useEffect(() => {
        setSelectedTracks([]);
    }, [sortOrder, setSelectedTracks]);

    if (isInLibrary || syncPlaylist.isSuccess) {
        // I always want the Playlist component to unmount when route changes. This way old tracks from
        // previous playlist don't show up and PlaylistTracks actually uses the initialTracks prop.
        return (
            <Playlist
                key={id}
                id={id!}
                uri={`spotify:playlist:${id}`}
                sortOrder={sortOrder}
                isInLibrary={isInLibrary}
                isLikedSongsCollection={false}
            />
        );
    }

    return <LoadingIndicator />;
}

export default PlaylistWrapper;
