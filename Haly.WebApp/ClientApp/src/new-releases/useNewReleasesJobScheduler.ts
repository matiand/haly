import { isFriday, isSameDay } from "date-fns";
import { useEffect, useRef } from "react";

import { ResponseError } from "../../generated/haly";
import halyClient from "../halyClient";

function useNewReleasesJobScheduler({ enabled }: { enabled: boolean }) {
    const firstTimeRef = useRef(true);

    useEffect(() => {
        if (!enabled) return;

        halyClient.jobs
            .getLatestCompletedNewReleasesJob()
            .then(({ finishedAt }) => {
                const today = new Date();
                if (isSameDay(finishedAt, today)) return;

                if (isFriday(today) && firstTimeRef.current) {
                    halyClient.jobs.collectNewReleases();
                    firstTimeRef.current = false;
                }
            })
            .catch((err) => {
                if (err instanceof ResponseError && err.response.status === 404 && firstTimeRef.current) {
                    halyClient.jobs.collectNewReleases();
                    firstTimeRef.current = false;
                }
            });
    }, [enabled]);
}

export default useNewReleasesJobScheduler;
