import { useQuery } from "@tanstack/react-query";
import { useSetAtom } from "jotai/index";
import { useEffect } from "react";

import { cachedPlaylistIdsAtom } from "../common/atoms";
import { GetMyPlaylistsQueryKey } from "../common/queryKeys";
import halyApi from "../halyClient";

function useMyPlaylistsQuery() {
    const setCachedPlaylistIds = useSetAtom(cachedPlaylistIdsAtom);

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
            const ids = query.data.map((p) => p.id);
            setCachedPlaylistIds(ids);
        }
    }, [query.data, setCachedPlaylistIds]);

    return query;
}

export default useMyPlaylistsQuery;
