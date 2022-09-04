import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";

import useAccessToken from "../auth/useAccessToken";
import { UserContext } from "../me/UserContext";
import { PlaylistDto } from "../playlist/Playlist";
import NavigationItem from "./NavigationItem";

function UserPlaylists() {
    const accessToken = useAccessToken();
    const user = useContext(UserContext);
    const query = useQuery<PlaylistDto[]>(["users", user.id, "playlists"], () => fetchPlaylists(user.id, accessToken), {
        suspense: true,
        useErrorBoundary: false,
    });

    if (!query.data) {
        return null;
    }

    return (
        <>
            {query.data.map((p) => {
                const to = `playlists/${p.id}`;

                return <NavigationItem key={p.id} title={p.name} href={to} />;
            })}
        </>
    );
}

async function fetchPlaylists(userId: string, accessToken: string) {
    const resp = await fetch(`${import.meta.env.VITE_API_ORIGIN}/users/${userId}/playlists?market=pl`, {
        method: "PUT",
        headers: { "x-spotify-token": accessToken },
    });
    if (resp.ok) {
        console.log("Playlists:", resp.statusText);
        return resp.json();
    }

    throw resp;
}

export default UserPlaylists;
