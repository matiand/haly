import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { useQuery } from "@tanstack/react-query";
import { useAtom } from "jotai";

import { playlistIdsWithOldTracksAtom } from "./atoms";

// Handle messages from SignalR hub
export const useMessageHub = () => {
    const [_, setPlaylistIdsWithOldTracks] = useAtom(playlistIdsWithOldTracksAtom);
    console.log("curr playlists", _);

    const connection = new HubConnectionBuilder()
        .withUrl(`${import.meta.env.VITE_API_ORIGIN}/hubs/playlist`)
        .withAutomaticReconnect()
        .configureLogging(LogLevel.Error)
        .build();

    connection.on("PlaylistsWithOldTracks", (playlistIds: string[]) => {
        console.log("update playlists, old, new", _, playlistIds);
        setPlaylistIdsWithOldTracks(playlistIds);
    });

    const query = useQuery(["hub"], () => connection.start().then(() => 1), { staleTime: Infinity });

    return { isConnected: query.data === 1 };
};
