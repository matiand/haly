import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { useQuery } from "@tanstack/react-query";
import { useAtom } from "jotai";

import { playlistIdsWithOldTracksAtom } from "./atoms";

// Handle messages from SignalR hub
export const useMessageHub = () => {
    const [, setPlaylistIdsWithOldTracks] = useAtom(playlistIdsWithOldTracksAtom);

    const connection = new HubConnectionBuilder()
        .withUrl(`${import.meta.env.VITE_API_ORIGIN}/hubs/playlist`)
        .withAutomaticReconnect()
        .configureLogging(LogLevel.Error)
        .build();

    connection.on("PlaylistsWithOldTracks", (playlistIds: string[]) => {
        setPlaylistIdsWithOldTracks(playlistIds);
    });

    const query = useQuery(["hub"], () => connection.start().then(() => 1), { staleTime: Infinity });

    return { isConnected: query.data === 1 };
};
