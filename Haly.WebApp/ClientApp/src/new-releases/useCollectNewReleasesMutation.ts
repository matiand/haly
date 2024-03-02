import { useMutation } from "@tanstack/react-query";

import halyClient from "../halyClient";

function useCollectNewReleasesMutation() {
    return useMutation(() => halyClient.jobs.collectNewReleases());
}

export default useCollectNewReleasesMutation;
