import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

import { styled } from "../common/theme";
import halyClient from "../halyClient";
import Collection from "./Collection";
import PlaylistControls from "./PlaylistControls";
import PlaylistHeader from "./PlaylistHeader";

function Playlist() {
    const { id } = useParams();
    const query = useQuery(["playlists", id], () => halyClient.playlists.getPlaylist({ id: id! }), { suspense: true });

    if (!query.data) {
        return null;
    }

    const playlist = query.data;

    return (
        <Main>
            <PlaylistHeader name={playlist.name} owner="junco" songsCount={44} totalDuration="1hr 51min" />
            <PlaylistControls />
            <Collection items={playlist.tracks} />
        </Main>
    );
}

const Main = styled("main", {
    position: "relative",
    "&&": {
        background: "linear-gradient(to bottom, #535353, $black600 500px)",
    },
});

export default Playlist;
