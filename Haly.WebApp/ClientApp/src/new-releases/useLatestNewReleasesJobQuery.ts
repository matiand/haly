import { useQuery } from "@tanstack/react-query";

import { ResponseError } from "../../generated/haly";
import { GetLatestNewReleasesJobQueryKey } from "../common/queryKeys";
import halyClient from "../halyClient";

function useLatestNewReleasesJobQuery() {
    return useQuery(GetLatestNewReleasesJobQueryKey, async () => {
        try {
            return halyClient.jobs.getLatestCompletedNewReleasesJob();
        } catch (e) {
            if (e instanceof ResponseError && e.response.status === 404) {
                return null;
            }
            throw e;
        }
    });
}

export default useLatestNewReleasesJobQuery;
