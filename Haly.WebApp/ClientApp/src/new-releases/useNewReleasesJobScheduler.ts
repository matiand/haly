import { useMutation, useQueryClient } from "@tanstack/react-query";
import { isFriday, isSameDay } from "date-fns";
import { useEffect, useRef } from "react";

import { ResponseError } from "../../generated/haly";
import { GetLatestNewReleasesJobQueryKey } from "../common/queryKeys";
import halyClient from "../halyClient";

function useNewReleasesJobScheduler({ enabled }: { enabled: boolean }) {
    const firstTimeRef = useRef(true);
    const queryClient = useQueryClient();
    const collectNewReleases = useMutation({
        mutationFn: () => halyClient.jobs.collectNewReleases(),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: GetLatestNewReleasesJobQueryKey });
        },
    });

    useEffect(() => {
        if (!enabled) return;

        halyClient.jobs
            .getLatestCompletedNewReleasesJob()
            .then(({ finishedAt }) => {
                const today = new Date();
                if (isSameDay(finishedAt, today)) return;

                if (isFriday(today) && firstTimeRef.current) {
                    collectNewReleases.mutate();
                    firstTimeRef.current = false;
                }
            })
            .catch((err) => {
                if (err instanceof ResponseError && err.response.status === 404 && firstTimeRef.current) {
                    collectNewReleases.mutate();
                    firstTimeRef.current = false;
                }
            });
    }, [enabled, collectNewReleases]);
}

export default useNewReleasesJobScheduler;
