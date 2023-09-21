import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

import halyClient from "../halyClient";
import LoadingIndicator from "../ui/LoadingIndicator";
import Playlist from "./Playlist";
import useIsPlaylistInLibrary from "./useIsPlaylistInLibrary";
import { usePersistedSortOrder } from "./useSortOrder";

function PlaylistWrapper() {
    const { id } = useParams();
    const [sortOrder] = usePersistedSortOrder(id!);
    const isInLibrary = useIsPlaylistInLibrary(id!);
    const syncPlaylist = useMutation(() => halyClient.playlists.putPlaylist({ id: id! }));

    console.log("is idle", syncPlaylist.isIdle);

    // Playlists that belong to the current user's library (i.e. those in the sidebar) are synced
    // automatically. For those that are not, we sync them manually.
    useEffect(() => {
        if (!isInLibrary && syncPlaylist.isIdle) {
            syncPlaylist.mutate();
        }
    }, [isInLibrary, syncPlaylist]);

    if (syncPlaylist.isLoading) {
        return <LoadingIndicator />;
    }

    // I always want the Playlist component to unmount when route changes. This way old tracks from
    // previous playlist don't show up and PlaylistTracks actually uses the initialTracks prop.
    return <Playlist key={id} id={id!} sortOrder={sortOrder} isInLibrary={isInLibrary} />;
}

export default PlaylistWrapper;
