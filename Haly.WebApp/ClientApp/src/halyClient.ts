import {
    Configuration,
    PlayerApi,
    PlaylistsApi,
    ProblemDetails,
    TrackDto,
    TrackDtoPaginatedList,
    UsersApi,
} from "../generated/haly";

const config = new Configuration({ basePath: import.meta.env.VITE_API_ORIGIN });

export default {
    users: new UsersApi(config),
    playlists: new PlaylistsApi(config),
    player: new PlayerApi(config),
    isProblemDetails: (obj: unknown): obj is ProblemDetails => {
        return typeof obj == "object" && obj !== null && "type" in obj && "status" in obj && "title" in obj;
    },
};

export type { TrackDto, TrackDtoPaginatedList };
