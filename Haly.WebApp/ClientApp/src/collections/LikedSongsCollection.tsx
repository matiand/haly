import { useQuery } from "@tanstack/react-query";

import { styled } from "../common/theme";
import halyClient from "../halyClient";
import PlaylistControls from "../playlist/PlaylistControls";
import PlaylistHeader from "../playlist/PlaylistHeader";
import PlaylistTracks from "../playlist/PlaylistTracks";

type LikedSongsCollectionProps = {
    id: string;
};

export function LikedSongsCollection({ id }: LikedSongsCollectionProps) {
    const query = useQuery(["playlists", id], () => halyClient.playlists.getPlaylist({ id }));

    if (!query.data) return null;

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
                owner={playlist.metadata.owner.name}
                songsCount={songsCount}
                totalDuration={totalDuration}
            />
            <PlaylistControls name={playlist.name} />
            <PlaylistTracks playlistId={playlist.id} initialTracks={playlist.tracks} />
        </Wrapper>
    );
}

const Wrapper = styled("div", {
    position: "relative",
    zIndex: 1,
});
