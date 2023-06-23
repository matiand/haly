import { useQuery } from "@tanstack/react-query";
import { useAtomValue } from "jotai";
import { useMemo } from "react";
import { useParams } from "react-router-dom";

import { isPlaylistCachedAtom, playlistHasOldTracksAtom } from "../common/atoms";
import LoadingIndicator from "../common/LoadingIndicator";
import { styled } from "../common/theme";
import halyClient from "../halyClient";
import PlaylistControls from "./PlaylistControls";
import PlaylistHeader from "./PlaylistHeader";
import PlaylistTracks from "./PlaylistTracks";

function Playlist() {
    const { id } = useParams();
    const query = usePlaylistQuery(id!);
    const hasOldTracks = useAtomValue(useMemo(() => playlistHasOldTracksAtom(id!), [id]));

    if (!query.data) {
        return <LoadingIndicator />;
    }

    if (hasOldTracks) console.log(id, " has old tracks");
    const playlist = query.data;
    const songsCount = playlist.tracks.total;
    const totalDuration = playlist.totalDuration;

    return (
        // This id is used by PlaylistTracks for its useInView hook
        <Wrapper id="playlist-container">
            <PlaylistHeader
                id={playlist.id}
                name={playlist.name}
                imageUrl={playlist.metadata.imageUrl}
                description={playlist.metadata.description}
                likesTotal={playlist.metadata.likesTotal}
                owner={playlist.metadata.owner.name}
                songsCount={songsCount}
                totalDuration={totalDuration}
            />
            <PlaylistControls name={playlist.name} />
            <PlaylistTracks playlistId={playlist.id} initialTracks={playlist.tracks} />
        </Wrapper>
    );
}

const usePlaylistQuery = (playlistId: string) => {
    const isCached = useAtomValue(useMemo(() => isPlaylistCachedAtom(playlistId), [playlistId]));

    const queryFn = useMemo(() => {
        console.log(`Playlist with id ${playlistId}, isCached: ${isCached}`);

        return isCached
            ? () => halyClient.playlists.getPlaylist({ id: playlistId })
            : () => halyClient.playlists.putPlaylist({ id: playlistId });
    }, [playlistId, isCached]);

    return useQuery(["playlists", playlistId], queryFn, {
        suspense: true,
    });
};

const Wrapper = styled("div", {
    padding: "$800 $700",
    position: "relative",
    zIndex: 1,
});

export default Playlist;
