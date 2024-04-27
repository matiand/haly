// todo: remove this if you never added a tsconfig to this project.
declare global {
    namespace NodeJS {
        interface ProcessEnv {
            SPOTIFY_CLIENT_ID: string;
        }
    }
}

export {};
