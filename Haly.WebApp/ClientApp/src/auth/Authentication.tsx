import { WebStorageStateStore } from "oidc-client-ts";
import React, { useEffect, useRef } from "react";
import { AuthProviderProps, useAuth } from "react-oidc-context";

import Loading from "../common/Loading";
import AuthenticationError from "./AuthenticationError";
import { Login, SilentLogin } from "./Login";

type AuthenticationProps = {
    children: React.ReactNode;
};

function Authentication(props: AuthenticationProps) {
    const auth = useAuth();
    const needsToHandleTokenExpirations = useRef(true);

    // Normally automatic token renewals in 'auth' are enabled
    // We had to turn them off, cause our app would crash from React's StrictMode rerenders
    // This effect makes sure that when a token is expiring, its renewal is attempted only once
    useEffect(() => {
        if (needsToHandleTokenExpirations.current) {
            auth.events.addAccessTokenExpiring(() => {
                auth.signinSilent().then(() => console.log("Token refreshed"));
            });
            console.log("Am I the only one?");

            needsToHandleTokenExpirations.current = false;
        }
    }, [auth]);

    if (auth.error) {
        return <AuthenticationError logout={auth.removeUser} message={auth.error!.message} />;
    }

    if (auth.isLoading) {
        return <Loading />;
    }

    if (auth.isAuthenticated) {
        return <>{props.children}</>;
    }

    const oldLoginExists = auth.user && !auth.isAuthenticated;
    if (oldLoginExists) {
        return <SilentLogin loginFn={auth.signinSilent} />;
    }

    return <Login loginFn={auth.signinRedirect} />;
}

export const oAuthConfig: AuthProviderProps = {
    // Their authority endpoint is blocked by CORS, so we need to specify
    // auth and token endpoints manually in metadata prop
    authority: import.meta.env.VITE_OAUTH_AUTHORITY,
    metadata: {
        authorization_endpoint: import.meta.env.VITE_OAUTH_AUTH_ENDPOINT,
        token_endpoint: import.meta.env.VITE_OAUTH_TOKEN_ENDPOINT,
        revocation_endpoint: import.meta.env.VITE_OAUTH_REVOKE_ENDPOINT,
    },
    client_id: import.meta.env.VITE_OAUTH_CLIENT_ID,
    client_secret: import.meta.env.VITE_OAUTH_CLIENT_SECRET,
    redirect_uri: import.meta.env.VITE_OAUTH_REDIRECT_URI,
    scope: import.meta.env.VITE_OAUTH_SCOPE,
    userStore: new WebStorageStateStore({ store: window.localStorage }),
    revokeTokensOnSignout: true,
    onSigninCallback() {
        window.history.replaceState({}, document.title, window.location.pathname);
    },
    automaticSilentRenew: false,
};

export default Authentication;
