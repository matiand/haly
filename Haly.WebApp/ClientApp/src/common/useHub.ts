import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { useQuery } from "react-query";

type PlaylistHubEvents = {
    onPlaylistTracksRefetchStarted: (data: unknown) => void;
    onPlaylistTracksRefetchCompleted: (data: unknown) => void;
};

export const usePlaylistHub = (events: PlaylistHubEvents) => {
    const connection = new HubConnectionBuilder()
        .withUrl(`${import.meta.env.VITE_API_ORIGIN}/hubs/playlist`)
        .withAutomaticReconnect()
        .configureLogging(LogLevel.Error)
        .build();

    connection.on("PlaylistTracksRefetchStarted", (data: any) => {
        console.log("PlaylistTracksRefetchStarted:", data);
    });

    connection.on("PlaylistTracksRefetchCompleted", (data: any) => {
        console.log("PlaylistTracksRefetchCompleted:", data);
    });

    const query = useQuery(["hubs", "playlist"], () => connection.start().then(() => 1), { staleTime: Infinity });

    return { isConnected: !query.isError && !query.isLoading };
};
