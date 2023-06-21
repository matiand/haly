import { useQuery } from "@tanstack/react-query";
import { useSetAtom } from "jotai";
import { useEffect } from "react";

import { cachedPlaylistIdsAtom } from "../common/atoms";
import { styled } from "../common/theme";
import halyApi from "../halyClient";
import UserLibraryLink from "./UserLibraryLink";

function UserPlaylists() {
    // We treat this PUT as query, because it's idempotent
    const query = useQuery(["me", "playlists"], () => halyApi.me.putCurrentUserPlaylists());
    const setCachedPlaylistIds = useSetAtom(cachedPlaylistIdsAtom);

    useEffect(() => {
        if (query.data) {
            const ids = query.data.map((p) => p.id);
            setCachedPlaylistIds(ids);
        }
    }, [query.data, setCachedPlaylistIds]);

    if (!query.data) {
        return null;
    }

    return (
        <List>
            <li>
                <UserLibraryLink name="Liked Songs" href="/collection/tracks" />
            </li>

            {query.data.map((p) => {
                const href = `playlists/${p.id}`;

                return (
                    <li key={p.id}>
                        <UserLibraryLink name={p.name} href={href} />
                    </li>
                );
            })}
        </List>
    );
}

const List = styled("ul", {
    padding: "$400",

    "& > li": {
        cursor: "pointer",
        height: "32px",
    },
});

export default UserPlaylists;
