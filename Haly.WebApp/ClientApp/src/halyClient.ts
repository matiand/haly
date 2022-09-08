import { Configuration, CurrentUserApi, PlaylistsApi, ProblemDetails, TrackDto, UsersApi } from "../generated/haly";

const config = new Configuration({ basePath: import.meta.env.VITE_API_ORIGIN });

export default {
    currentUser: new CurrentUserApi(config),
    users: new UsersApi(config),
    playlists: new PlaylistsApi(config),
    isProblemDetails: (obj: unknown): obj is ProblemDetails => {
        return typeof obj == "object" && obj !== null && "type" in obj && "status" in obj && "title" in obj;
    },
};

export type { TrackDto };
