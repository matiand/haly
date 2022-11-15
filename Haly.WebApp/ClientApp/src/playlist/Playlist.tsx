import { useQuery } from "@tanstack/react-query";
import React, { useRef } from "react";
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

    const playlist = playlistQuery.data;
    const songsCount = playlist.tracks.total;

    return (
        // This id is used by PlaylistTracks for its useInView hook
        <Main id="playlist-container">
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
