import {
    Configuration,
    PlayerApi,
    PlaylistsApi,
    Problem,
    TrackDto,
    TrackDtoPaginatedList,
    UsersApi,
} from "../generated/haly";

const config = new Configuration({ basePath: import.meta.env.VITE_API_ORIGIN });

export default {
    users: new UsersApi(config),
    playlists: new PlaylistsApi(config),
    player: new PlayerApi(config),
    isProblem: (obj: unknown): obj is Problem => {
        return typeof obj == "object" && obj !== null && "type" in obj && "status" in obj && "title" in obj;
    },
};

export type { TrackDto, TrackDtoPaginatedList };
