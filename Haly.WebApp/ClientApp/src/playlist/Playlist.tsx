import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router-dom";

import { styled } from "../common/theme";
import halyClient from "../halyClient";
import PlaylistControls from "./PlaylistControls";
import PlaylistHeader from "./PlaylistHeader";
import PlaylistTracks from "./PlaylistTracks";

function Playlist() {
    const { id } = useParams();
    const playlistQuery = useQuery(["playlists", id], () => halyClient.playlists.getPlaylist({ id: id! }), {
        suspense: true,
    });
    if (!playlistQuery.data) {
        return null;
    }

    // console.log("prev", tracksQuery.hasPreviousPage);
    // console.log("next", tracksQuery.hasNextPage);
    // console.log(inView);

    const playlist = playlistQuery.data;
    const songsCount = playlist.tracks.total;

    return (
        <Main>
            <PlaylistHeader name={playlist.name} owner="junco" songsCount={songsCount} totalDuration="1hr 51min" />
            <PlaylistControls />
            <PlaylistTracks initialTracks={playlist.tracks.items} />
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
