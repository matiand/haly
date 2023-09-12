import { useQuery } from "@tanstack/react-query";

import halyClient from "../halyClient";

export const RecentlyPlayedQueryKey = ["me", "player", "recently-played"];

function useRecentlyPlayedQuery() {
    return useQuery(RecentlyPlayedQueryKey, () => halyClient.player.getRecentlyPlayed());
}

export default useRecentlyPlayedQuery;
