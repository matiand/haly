import { useQuery } from "@tanstack/react-query";
import { useSetAtom } from "jotai";
import { useEffect } from "react";

import { cachedPlaylistIdsAtom } from "../common/atoms";
import { styled } from "../common/theme";
import halyApi from "../halyClient";
import { ScrollArea } from "../ui/ScrollArea";
import UserLibraryHeader from "./UserLibraryHeader";
import UserPlaylists from "./UserPlaylists";

function UserLibrary() {
    // We treat this PUT as query, because it's idempotent
    const query = useQuery(["me", "playlists"], () => halyApi.me.putCurrentUserPlaylists());
    const setCachedPlaylistIds = useSetAtom(cachedPlaylistIdsAtom);

    useEffect(() => {
        if (query.data) {
            const ids = query.data.map((p) => p.id);
            setCachedPlaylistIds(ids);
        }
    }, [query.data, setCachedPlaylistIds]);

    if (!query.data) return <Wrapper />;

    return (
        <Wrapper>
            <UserLibraryHeader />

            <ScrollArea>
                <UserPlaylists playlists={query.data} />
            </ScrollArea>
        </Wrapper>
    );
}

const Wrapper = styled("div", {
    display: "flex",
    flexFlow: "column",
    height: "100%",
    minHeight: 0,
});

export default UserLibrary;
