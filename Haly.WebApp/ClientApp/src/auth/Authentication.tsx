import formatISO from "date-fns/formatISO";
import { WebStorageStateStore } from "oidc-client-ts";
import React from "react";
import { AuthProviderProps, useAuth } from "react-oidc-context";

import Loading from "../common/Loading";
import { Login, SilentLogin } from "./Login";

type AuthenticationProps = {
    children: React.ReactNode;
};

function Authentication(props: AuthenticationProps) {
    const auth = useAuth();

    if (auth.error) {
        return (
            <div>
                <h1>Authentication error</h1>
                <pre>{auth.error.message}</pre>
                <pre>{formatISO(new Date())}</pre>
                <button onClick={() => auth.removeUser()}>Force logout</button>
            </div>
        );
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
};

export default Authentication;