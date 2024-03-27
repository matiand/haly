import { useMutation, useQueryClient } from "@tanstack/react-query";

import { GetLatestNewReleasesJobQueryKey } from "../common/queryKeys";
import halyClient from "../halyClient";
import { showToastOnProblem } from "../queryClient";

function useCollectNewReleasesMutation() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: () => halyClient.jobs.collectNewReleases(),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: GetLatestNewReleasesJobQueryKey });
        },
        onError: showToastOnProblem,
    });
}

export default useCollectNewReleasesMutation;
