import React, { useEffect, useRef } from "react";
import { useAuth } from "react-oidc-context";

import AuthenticationError from "./AuthenticationError";
import AuthenticationLoading from "./AuthenticationLoading";
import { Login } from "./Login";
import useRefreshTokenMutation from "./useRefreshTokenMutation";

type AuthenticationProps = {
    children: React.ReactNode;
};

function Authentication(props: AuthenticationProps) {
    const auth = useAuth();
    const isTokenExpirationHandlerRegistered = useRef(false);
    const refreshToken = useRefreshTokenMutation();

    // Normally automatic token renewals in 'auth' are enabled by default.
    // I had to turn them off, cause the app would crash from React's StrictMode rerenders
    // This effect makes sure that when a token is expiring, its renewal is attempted only once
    useEffect(() => {
        if (!isTokenExpirationHandlerRegistered.current) {
            auth.events.addAccessTokenExpiring(() => {
                refreshToken.mutate();
            });

            isTokenExpirationHandlerRegistered.current = true;
        }

        const oldLoginExists = auth.user && !auth.isAuthenticated;
        if (oldLoginExists && refreshToken.isIdle) {
            console.log("Silently logging in");
            refreshToken.mutate();
        }
    }, [auth, refreshToken]);

    useEffect(() => {
        if (auth.isAuthenticated && auth.user?.access_token) {
            // Web Playback SDK uses a fn for retrieving an access token, it calls that fn
            // internally so it's hard for us to manage that. That's why we store it in
            // local storage.
            localStorage.setItem("spotifyToken", auth.user.access_token);
        }
    }, [auth.isAuthenticated, auth.user]);

    if (auth.isAuthenticated) {
        return <>{props.children}</>;
    }

    if (auth.error) {
        return <AuthenticationError logout={auth.removeUser} message={auth.error!.message} />;
    }

    // If user exists but we aren't authenticated, we wait for silent token refresh to complete
    if (auth.isLoading || auth.user) {
        return <AuthenticationLoading logout={auth.removeUser} />;
    }

    return <Login loginFn={auth.signinRedirect} />;
}

export default Authentication;
