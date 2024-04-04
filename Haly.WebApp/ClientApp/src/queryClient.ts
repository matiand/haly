import { focusManager, QueryCache, QueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { ResponseError } from "../generated/haly";
import halyClient from "./halyClient";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: 2,
            retryDelay: (retryAttempt) => Math.pow(3, retryAttempt + 1) * 1000,
        },
    },
    queryCache: new QueryCache({
        onError: showToastOnProblem,
    }),
});

export async function showToastOnProblem(error: unknown) {
    if (error instanceof ResponseError) {
        const problem = await error.response.json();

        if (halyClient.isProblem(problem)) {
            toast.error(problem.title);
            return;
        }
    }

    throw error;
}

// React-Query v5 only listens to 'visibilitychange' events. For some users, alt-tabbing is not
// recognized, thus we need to listen to 'focus' events too.
if (import.meta.env.PROD) {
    focusManager.setEventListener((handleFocus) => {
        if (typeof window !== "undefined" && window.addEventListener) {
            // @ts-expect-error Fake error
            window.addEventListener("visibilitychange", handleFocus);
            // @ts-expect-error Fake error
            window.addEventListener("focus", handleFocus);
        }

        return () => {
            // @ts-expect-error Fake error
            window.removeEventListener("visibilitychange", handleFocus);
            // @ts-expect-error Fake error
            window.removeEventListener("focus", handleFocus);
        };
    });
}

export default queryClient;
