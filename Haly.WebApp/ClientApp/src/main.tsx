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
import Authentication, { oAuthConfig } from "./auth/Authentication";
import halyClient from "./halyClient";

const queryClient = new QueryClient({
    queryCache: new QueryCache({
        async onError(error) {
            if (!(error instanceof Error)) return;

            if (error instanceof ResponseError) {
                const respBody = await error.response.json();
                if (halyClient.isProblem(respBody)) {
                    toast.error(respBody.title!);
                    return;
                }
            }

            console.log("Unknown error", error.message);
        },
    }),
});

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <AuthProvider {...oAuthConfig}>
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
