import { useQuery } from "@tanstack/react-query";
import { useAtom } from "jotai";
import { useMemo } from "react";
import { useParams } from "react-router-dom";

import { playlistHasOldTracksAtom } from "../common/atoms";
import { styled } from "../common/theme";
import halyClient from "../halyClient";
import PlaylistControls from "./PlaylistControls";
import PlaylistHeader from "./PlaylistHeader";
import PlaylistTracks from "./PlaylistTracks";

function Playlist() {
    const { id } = useParams();
    const [hasOldTracks] = useAtom(useMemo(() => playlistHasOldTracksAtom(id!), [id]));

    const playlistQuery = useQuery(["playlists", id], () => halyClient.playlists.getPlaylist({ id: id! }), {
        suspense: true,
    });

    if (!playlistQuery.data) {
        return null;
    }

    if (hasOldTracks) console.log(id, " has old tracks");
    const playlist = playlistQuery.data;
    const songsCount = playlist.tracks.total;

    return (
        // This id is used by PlaylistTracks for its useInView hook
        <Main id="playlist-container">
            <PlaylistHeader
                name={playlist.name}
                imageUrl={playlist.metadata.imageUrl}
                description={playlist.metadata.description}
                owner={playlist.metadata.owner.name}
                songsCount={songsCount}
                totalDuration="N/A"
            />
            <PlaylistControls name={playlist.name} />
            <PlaylistTracks initialTracks={playlist.tracks} />
        </Main>
    );
}

const Main = styled("main", {
    position: "relative",
    zIndex: 1,
});

export default Playlist;
