import { useMutation, useQueryClient } from "@tanstack/react-query";

import { GetLatestNewReleasesJobQueryKey } from "../common/queryKeys";
import halyClient from "../halyClient";

function useCollectNewReleasesMutation() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: () => halyClient.jobs.collectNewReleases(),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: GetLatestNewReleasesJobQueryKey });
        },
    });
}

export default useCollectNewReleasesMutation;
