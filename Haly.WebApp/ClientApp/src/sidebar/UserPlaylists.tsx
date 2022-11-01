import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";

import useAccessToken from "../auth/useAccessToken";
import halyApi from "../halyClient";
import { UserContext } from "../me/UserContext";
import NavigationItem from "./NavigationItem";

function UserPlaylists() {
    const accessToken = useAccessToken();
    const user = useContext(UserContext);
    const query = useQuery(
        ["users", user.id, "playlists"],
        () =>
            halyApi.users.putUserPlaylists({
                userId: user.id,
                xSpotifyToken: accessToken,
            }),
        {
            suspense: true,
        },
    );

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

export default UserPlaylists;
