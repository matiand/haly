import "./common/globalStyles";

import React from "react";
import ReactDOM from "react-dom/client";
import toast from "react-hot-toast";
import { AuthProvider } from "react-oidc-context";
import { QueryCache, QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import Authentication, { oAuthConfig } from "./auth/Authentication";

const queryClient = new QueryClient({
    queryCache: new QueryCache({
        onError(error, query) {
            // TODO: specify toast msg based on request status code
            console.error(`Query error: ${error instanceof Error && error.message}`);

            const { queryKey } = query.options;
            console.log("Query key: ", queryKey);
            if (queryKey?.[0] === "users" && queryKey[1] === "me") {
                toast.error("Authentication failed.\nRefresh page to try again.");
            } else {
                toast.error("Backend error");
            }
        },
    }),
});

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <AuthProvider {...oAuthConfig}>
            <BrowserRouter>
                <QueryClientProvider client={queryClient}>
                    <Authentication>
                        <App />
                    </Authentication>
                </QueryClientProvider>
            </BrowserRouter>
        </AuthProvider>
    </React.StrictMode>,
);
