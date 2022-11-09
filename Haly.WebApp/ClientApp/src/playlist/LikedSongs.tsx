import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";

import useAccessToken from "../auth/useAccessToken";
import halyClient from "../halyClient";
import { UserContext } from "../me/UserContext";
import Collection from "./Collection";

function LikedSongs() {
    const accessToken = useAccessToken();
    const user = useContext(UserContext);

    const query = useQuery(
        ["users", "me", "tracks"],
        () =>
            halyClient.users.getLikedSongs({
                userId: user.id,
                market: user.market,
                xSpotifyToken: accessToken,
            }),
        { suspense: true },
    );

    if (!query.data) return null;

    return (
        <main>
            <h1>Liked Songs</h1>
            <Collection items={query.data} />
        </main>
    );
}

export default LikedSongs;
