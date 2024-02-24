import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSetAtom } from "jotai";

import { playlistIdsWithOldTracksAtom } from "./atoms/playlistAtoms";
import { GetPlaylistQueryKey } from "./queryKeys";

// MessageHub is a SignalR hub used for minor communication with our backend. These messages improve
// the user experience, but aren't necessary for enjoying this app
export const useMessageHub = () => {
    const queryClient = useQueryClient();
    const setPlaylistIdsWithOldTracks = useSetAtom(playlistIdsWithOldTracksAtom);

    const connection = new HubConnectionBuilder()
        .withUrl(`${import.meta.env.VITE_API_ORIGIN}/hub`)
        .withAutomaticReconnect()
        .configureLogging(import.meta.env.DEV ? LogLevel.Information : LogLevel.Error)
        .build();

    connection.on("PlaylistsWithOldTracks", (playlistIds: string[]) => {
        console.log("PlaylistsWithOldTracks", playlistIds);
        setPlaylistIdsWithOldTracks(playlistIds);
    });

    connection.on("PlaylistUpdated", (playlistId: string) => {
        queryClient.invalidateQueries(GetPlaylistQueryKey(playlistId));
    });

    const query = useQuery(["hub"], () => connection.start().then(() => 1), { staleTime: Infinity });

    connection.onclose(() => {
        // The connection is usually closed by having no internet access. By invalidating this query
        // we make sure we'll get automatically reconnected when internet is back.
        console.log("MessageHub is offline");
        queryClient.invalidateQueries(["hub"]);
    });

    return { isMessageHubReady: query.isSuccess };
};
