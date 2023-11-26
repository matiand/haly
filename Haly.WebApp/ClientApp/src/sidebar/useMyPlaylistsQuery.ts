import { useQuery } from "@tanstack/react-query";
import { useSetAtom } from "jotai";
import { useEffect } from "react";

import { cachedPlaylistsAtom } from "../common/atoms/playlistAtoms";
import { GetMyPlaylistsQueryKey } from "../common/queryKeys";
import halyApi from "../halyClient";

function useMyPlaylistsQuery() {
    const setCachedPlaylistIds = useSetAtom(cachedPlaylistsAtom);

    // This is actually a PUT request, but we treat it as a query, because it's idempotent and this
    // way it's easier for us to have the playlists up to date.
    const query = useQuery(GetMyPlaylistsQueryKey, () =>
        halyApi.me.putMyPlaylists().then((playlists) => {
            /* refetchOnWindowFocus is set to true, i.e. this query will run often, so we don't
             * care if this job fails sometimes. */
            halyApi.jobs.refetchCurrentUserPlaylistTracks().catch(/* ignore */);

            return playlists;
        }),
    );

    useEffect(() => {
        if (query.data) {
            setCachedPlaylistIds(query.data);
        }
    }, [query.data, setCachedPlaylistIds]);

    return query;
}

export default useMyPlaylistsQuery;
