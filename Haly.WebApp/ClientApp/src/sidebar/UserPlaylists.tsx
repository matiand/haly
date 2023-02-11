import { useQuery } from "@tanstack/react-query";

import halyApi from "../halyClient";
import NavigationItem from "./NavigationItem";

function UserPlaylists() {
    const query = useQuery(["me", "playlists"], () => halyApi.me.putCurrentUserPlaylists());

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
