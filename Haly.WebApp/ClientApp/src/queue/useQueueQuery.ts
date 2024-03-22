import { useQuery } from "@tanstack/react-query";

import { GetQueueQueryKey } from "../common/queryKeys";
import halyClient from "../halyClient";

function useQueueQuery() {
    return useQuery({
        queryKey: GetQueueQueryKey,
        queryFn: () => halyClient.player.getQueue(),
    });
}

export default useQueueQuery;
