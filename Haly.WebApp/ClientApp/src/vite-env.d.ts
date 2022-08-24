/// <reference types="vite/client" />

interface ImportMetaEnv {
    VITE_API_ORIGIN: string;
    VITE_OAUTH_AUTHORITY: string;
    VITE_OAUTH_AUTH_ENDPOINT: string;
    VITE_OAUTH_TOKEN_ENDPOINT: string;
    VITE_OAUTH_REVOKE_ENDPOINT: string;
    VITE_OAUTH_CLIENT_ID: string;
    VITE_OAUTH_CLIENT_SECRET: string;
    VITE_OAUTH_REDIRECT_URI: string;
    VITE_OAUTH_SCOPE: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
