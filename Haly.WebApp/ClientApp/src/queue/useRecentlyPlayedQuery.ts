import { useQuery } from "@tanstack/react-query";

import { GetRecentlyPlayedQueryKey } from "../common/queryKeys";
import halyClient from "../halyClient";

function useRecentlyPlayedQuery() {
    return useQuery(GetRecentlyPlayedQueryKey, () => halyClient.player.getRecentlyPlayed());
}

export default useRecentlyPlayedQuery;
