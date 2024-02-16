import { QueryCache, QueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { ResponseError } from "../generated/haly";
import halyClient from "./halyClient";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: import.meta.env.PROD,
        },
    },
    queryCache: new QueryCache({
        async onError(error) {
            if (error instanceof ResponseError) {
                const responseBody = await error.response.json();
                if (halyClient.isProblem(responseBody)) {
                    toast.error(responseBody.title!);

                    return;
                }
            }

            console.error("Unknown error", (error as Error).message);
        },
    }),
});

export default queryClient;
