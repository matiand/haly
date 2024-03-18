import "./common/globalStyles";

import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import React from "react";
import ReactDOM from "react-dom/client";
import { AuthProvider } from "react-oidc-context";
import { RouterProvider } from "react-router-dom";

import Authentication from "./auth/Authentication";
import { OAuthConfig } from "./auth/OAuthConfig";
import queryClient from "./queryClient";
import router from "./router";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <AuthProvider {...OAuthConfig}>
            <QueryClientProvider client={queryClient}>
                <ReactQueryDevtools position="top-right" toggleButtonProps={{ className: "rq-toggle" }} />
                <Authentication>
                    <RouterProvider router={router} />
                </Authentication>
            </QueryClientProvider>
        </AuthProvider>
    </React.StrictMode>,
);
