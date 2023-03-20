import { useQuery } from "@tanstack/react-query";
import { useAtomValue } from "jotai";
import { useMemo } from "react";
import { useParams } from "react-router-dom";

import { isPlaylistCachedAtom, playlistHasOldTracksAtom } from "../common/atoms";
import { styled } from "../common/theme";
import halyClient from "../halyClient";
import PlaylistControls from "./PlaylistControls";
import PlaylistHeader from "./PlaylistHeader";
import PlaylistTracks from "./PlaylistTracks";

// todo: move to seperate file?
const usePlaylistQuery = (playlistId: string) => {
    const isCached = useAtomValue(useMemo(() => isPlaylistCachedAtom(playlistId), [playlistId]));

    const queryFn = useMemo(() => {
        console.log(`Playlist with id ${playlistId}, isCached: ${isCached}`);

        return isCached
            ? () => halyClient.playlists.getPlaylist({ id: playlistId })
            : () => halyClient.playlists.putPlaylist({ id: playlistId });
    }, [playlistId, isCached]);

    // todo: remove all suspense, check if gradient renders ok
    return useQuery(["playlists", playlistId], queryFn, {
        suspense: true,
    });
};

function Playlist() {
    const { id } = useParams();
    const query = usePlaylistQuery(id!);
    const hasOldTracks = useAtomValue(useMemo(() => playlistHasOldTracksAtom(id!), [id]));

    if (!query.data) {
        return null;
    }

    if (hasOldTracks) console.log(id, " has old tracks");
    const playlist = query.data;
    const songsCount = playlist.tracks.total;
    const totalDuration = playlist.totalDuration;

    return (
        // This id is used by PlaylistTracks for its useInView hook
        <Main id="playlist-container">
            <PlaylistHeader
                name={playlist.name}
                imageUrl={playlist.metadata.imageUrl}
                description={playlist.metadata.description}
                owner={playlist.metadata.owner.name}
                songsCount={songsCount}
                totalDuration={totalDuration}
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
