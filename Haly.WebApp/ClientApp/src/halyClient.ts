import {
    AlbumsApi,
    ArtistsApi,
    Configuration,
    JobsApi,
    LyricsApi,
    MeApi,
    MeFollowingApi,
    Middleware,
    PlayerApi,
    PlaylistsApi,
    Problem,
    ResponseContext,
    SearchApi,
    UsersApi,
} from "../generated/haly";

// Somehow the generated client can't handle 204 GET responses. This is our workaround.
class NoContentMiddleware implements Middleware {
    public post?(context: ResponseContext): Promise<Response | void> {
        if (context.response.status === 204 && context.init.method === "GET") {
            throw {
                status: 204,
            };
        }

        return Promise.resolve(context.response);
    }
}

const config = new Configuration({
    basePath: import.meta.env.VITE_API_ORIGIN,
    middleware: [new NoContentMiddleware()],
});

export default {
    me: new MeApi(config),
    meFollowing: new MeFollowingApi(config),
    playlists: new PlaylistsApi(config),
    player: new PlayerApi(config),
    users: new UsersApi(config),
    artists: new ArtistsApi(config),
    albums: new AlbumsApi(config),
    jobs: new JobsApi(config),
    search: new SearchApi(config),
    lyrics: new LyricsApi(config),
    isProblem: (obj: unknown): obj is Problem => {
        return typeof obj == "object" && obj !== null && "type" in obj && "status" in obj && "title" in obj;
    },
};
