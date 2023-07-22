import "./common/globalStyles";

import { QueryCache, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import React from "react";
import ReactDOM from "react-dom/client";
import toast from "react-hot-toast";
import { AuthProvider } from "react-oidc-context";
import { BrowserRouter } from "react-router-dom";

import { ResponseError } from "../generated/haly";
import App from "./App";
import Authentication from "./auth/Authentication";
import { OAuthConfig } from "./auth/OAuthConfig";
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

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <AuthProvider {...OAuthConfig}>
            <BrowserRouter>
                <QueryClientProvider client={queryClient}>
                    <ReactQueryDevtools position="top-right" toggleButtonProps={{ className: "rq-toggle" }} />
                    <Authentication>
                        <App />
                    </Authentication>
                </QueryClientProvider>
            </BrowserRouter>
        </AuthProvider>
    </React.StrictMode>,
);
