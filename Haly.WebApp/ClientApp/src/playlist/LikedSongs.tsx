import { useQuery } from "@tanstack/react-query";

import halyClient from "../halyClient";
import Collection from "./Collection";

function LikedSongs() {
    const query = useQuery(["me", "tracks"], () => halyClient.me.getLikedSongs(), { suspense: true });

    if (!query.data) return null;

    return (
        <main>
            <h1>Liked Songs</h1>
            <Collection items={query.data} />
        </main>
    );
}

export default LikedSongs;
