import "./common/globalStyles";

import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import React from "react";
import ReactDOM from "react-dom/client";
import { AuthProvider } from "react-oidc-context";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import Authentication from "./auth/Authentication";
import { OAuthConfig } from "./auth/OAuthConfig";
import queryClient from "./queryClient";

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
