/// <reference types="vite/client" />

interface ImportMetaEnv {
    VITE_API_ORIGIN: string;
    VITE_REDIRECT_URI: string;

    // Spotify
    VITE_SPOTIFY_AUTHORITY: string;
    VITE_SPOTIFY_AUTH_ENDPOINT: string;
    VITE_SPOTIFY_TOKEN_ENDPOINT: string;
    VITE_SPOTIFY_REVOKE_ENDPOINT: string;
    VITE_SPOTIFY_CLIENT_ID: string;
    VITE_SPOTIFY_CLIENT_SECRET: string;
    VITE_SPOTIFY_SCOPE: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
