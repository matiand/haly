import { useEffect, useState } from "react";
import { useAuth } from "react-oidc-context";
import { useParams } from "react-router-dom";

import Collection from "./Collection";

export type PlaylistDto = {
    id: string;
    name: string;
    tracks: {
        id: string;
        name: string;
        duration: string;
        addedAt: string;
        album: {
            id: string;
            name: string;
            artists: { id: string; name: string }[];
        };
        artists: { id: string; name: string }[];
    }[];
};

function Playlist() {
    const { user } = useAuth();
    const { id: playlistId } = useParams();
    const [playlist, setPlaylist] = useState<PlaylistDto>();

    useEffect(() => {
        async function fetchPlaylists() {
            try {
                const resp = await fetch(`${import.meta.env.VITE_API_ORIGIN}/playlists/${playlistId}`, {
                    headers: { "x-spotify-token": user!.access_token! },
                });
                if (resp.ok) {
                    console.log(resp.statusText);
                    setPlaylist(await resp.json());
                }
            } catch (e) {
                console.error(e);
            }
        }

        fetchPlaylists();
    }, [playlistId, user]);

    if (!playlist) {
        return null;
    }

    return (
        <main>
            <h1>{playlist.name}</h1>
            <Collection items={playlist.tracks} />
        </main>
    );
}

export default Playlist;
