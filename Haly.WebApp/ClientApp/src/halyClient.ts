import {
    AlbumsApi,
    ArtistsApi,
    Configuration,
    MeApi,
    PlayerApi,
    PlaylistsApi,
    Problem,
    UsersApi,
} from "../generated/haly";

const config = new Configuration({ basePath: import.meta.env.VITE_API_ORIGIN });

export default {
    me: new MeApi(config),
    playlists: new PlaylistsApi(config),
    player: new PlayerApi(config),
    users: new UsersApi(config),
    artists: new ArtistsApi(config),
    albums: new AlbumsApi(config),
    isProblem: (obj: unknown): obj is Problem => {
        return typeof obj == "object" && obj !== null && "type" in obj && "status" in obj && "title" in obj;
    },
};
