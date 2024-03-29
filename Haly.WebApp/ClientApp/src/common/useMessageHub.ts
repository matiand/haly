import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSetAtom } from "jotai";

import { artistsLeftAtom } from "./atoms/newReleasesAtom";
import { playlistIdsWithOldTracksAtom } from "./atoms/playlistAtoms";
import { GetMessageHubQueryKey, GetPlaylistQueryKey } from "./queryKeys";

// MessageHub is a SignalR hub used for minor communication with our backend. These messages improve
// the user experience, but aren't necessary for enjoying this app.
export const useMessageHub = () => {
    const queryClient = useQueryClient();
    const setPlaylistIdsWithOldTracks = useSetAtom(playlistIdsWithOldTracksAtom);
    const setArtistsLeft = useSetAtom(artistsLeftAtom);

    const connection = new HubConnectionBuilder()
        .withUrl(`${import.meta.env.VITE_API_ORIGIN}/hub`)
        .configureLogging(import.meta.env.DEV ? LogLevel.Information : LogLevel.Error)
        .build();

    connection.on("PlaylistsWithOldTracks", (playlistIds: string[]) => {
        console.log("PlaylistsWithOldTracks", playlistIds);
        setPlaylistIdsWithOldTracks(playlistIds);
    });

    connection.on("PlaylistUpdated", (playlistId: string) => {
        queryClient.invalidateQueries({ queryKey: GetPlaylistQueryKey(playlistId) });
    });

    connection.on("CollectingNewReleases", (artistsLeft: number) => {
        setArtistsLeft(artistsLeft);
    });

    connection.onclose(() => {
        console.log("MessageHub is offline");
        // The connection can be closed by having no internet access or tab inactivity. By
        // invalidating this query we should be automatically reconnected when it's possible to do so.
        queryClient.invalidateQueries({ queryKey: GetMessageHubQueryKey });
    });

    // Technically, this should not be a query, but it's the easiest way I found to manage the connection.
    return useQuery({
        queryKey: GetMessageHubQueryKey,
        queryFn: () =>
            connection.start().then(() => {
                console.log("MessageHub is online");
                return connection;
            }),
        staleTime: Infinity,
        refetchOnWindowFocus: true,
    });
};
