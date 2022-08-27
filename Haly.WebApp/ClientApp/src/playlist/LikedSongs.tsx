import { useContext } from "react";
import { useQuery } from "react-query";

import useAccessToken from "../auth/useAccessToken";
import { UserContext } from "../me/UserContext";
import Collection from "./Collection";

function LikedSongs() {
    const accessToken = useAccessToken();
    const user = useContext(UserContext);

    const query = useQuery(
        ["users", "me", "tracks"],
        async () => {
            const resp = await fetch(`${import.meta.env.VITE_API_ORIGIN}/users/me/tracks?market=${user.market}`, {
                headers: { "x-spotify-token": accessToken },
            });
            if (!resp.ok) throw new Error(resp.statusText);

            return await resp.json();
        },
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
