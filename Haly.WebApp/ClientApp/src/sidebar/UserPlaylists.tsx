import { useQuery } from "@tanstack/react-query";
import { useSetAtom } from "jotai";
import { useEffect } from "react";

import { cachedPlaylistIdsAtom } from "../common/atoms";
import halyApi from "../halyClient";
import NavigationItem from "./NavigationItem";

// todo: move to seperate file?
const usePutUserPlaylistsQuery = () => {
    const query = useQuery(["me", "playlists"], () => halyApi.me.putCurrentUserPlaylists());
    const setCachedPlaylistIds = useSetAtom(cachedPlaylistIdsAtom);

    useEffect(() => {
        if (query.data) {
            const ids = query.data.map((p) => p.id);
            setCachedPlaylistIds(ids);
        }
    }, [query.data, setCachedPlaylistIds]);

    return query;
};

function UserPlaylists() {
    const query = usePutUserPlaylistsQuery();

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
