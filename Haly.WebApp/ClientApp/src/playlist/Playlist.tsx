import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

import halyClient from "../halyClient";
import Collection from "./Collection";

function Playlist() {
    const { id } = useParams();
    const query = useQuery(["playlists", id], () => halyClient.playlists.getPlaylist({ id: id! }), { suspense: true });

    if (!query.data) {
        return null;
    }

    const playlist = query.data;

    return (
        <main>
            <h1>{playlist.name}</h1>
            <Collection items={playlist.tracks} />
        </main>
    );
}

export default Playlist;
