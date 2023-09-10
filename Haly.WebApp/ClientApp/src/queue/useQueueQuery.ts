import { useQuery } from "@tanstack/react-query";

import halyClient from "../halyClient";

export const QueueQueryKey = ["me", "player", "queue"];

function useQueueQuery() {
    return useQuery(QueueQueryKey, () => halyClient.player.getQueue());
}

export default useQueueQuery;
