import { Configuration, CurrentUserApi, PlaylistsApi, TrackDto, UsersApi } from "../generated/haly";

const config = new Configuration({ basePath: import.meta.env.VITE_API_ORIGIN });

export default {
    currentUser: new CurrentUserApi(config),
    users: new UsersApi(config),
    playlists: new PlaylistsApi(config),
};

export type { TrackDto };
