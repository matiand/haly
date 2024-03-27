import { QueryCache, QueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { ResponseError } from "../generated/haly";
import halyClient from "./halyClient";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: import.meta.env.PROD,
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

export default queryClient;
