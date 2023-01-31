import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { useQuery } from "@tanstack/react-query";

type PlaylistHubEvents = {
    onPlaylistsWithOldTracks: (playlistIds: string[]) => void;
};

export const usePlaylistHub = (events: PlaylistHubEvents) => {
    const connection = new HubConnectionBuilder()
        .withUrl(`${import.meta.env.VITE_API_ORIGIN}/hubs/playlist`)
        .withAutomaticReconnect()
        .configureLogging(LogLevel.Error)
        .build();

    connection.on("PlaylistsWithOldTracks", (playlistIds: string[]) => {
        events.onPlaylistsWithOldTracks(playlistIds);
    });

    const query = useQuery(["hubs", "playlist"], () => connection.start().then(() => 1), { staleTime: Infinity });

    return { isConnected: !query.isError && !query.isLoading };
};
