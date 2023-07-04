import { useQuery } from "@tanstack/react-query";

import LoadingIndicator from "../common/LoadingIndicator";
import PageControls from "../common/PageControls";
import { styled } from "../common/theme";
import halyClient from "../halyClient";
import PlaybackToggle from "../playback/PlaybackToggle";
import PlaylistHeader from "../playlist/PlaylistHeader";
import PlaylistTracks from "../playlist/PlaylistTracks";
import SearchBar from "./SearchBar";

type LikedSongsCollectionProps = {
    id: string;
};

export function LikedSongsCollection({ id }: LikedSongsCollectionProps) {
    const query = useQuery(["playlists", id], () => halyClient.playlists.getPlaylist({ id }));

    if (!query.data) {
        return <LoadingIndicator />;
    }

    const playlist = query.data;
    const songsTotal = playlist.tracks.total;
    const totalDuration = playlist.totalDuration;

    return (
        // This id is used by PlaylistTracks for its useInView hook
        <Wrapper id="playlist-container">
            <PlaylistHeader
                name={playlist.name}
                metadata={playlist.metadata}
                songsTotal={songsTotal}
                totalDuration={totalDuration}
            />

            <PageControls>
                <PlaybackToggle size="large" />
                <SearchBar variant="playlist" />
            </PageControls>

            <PlaylistTracks playlistId={playlist.id} initialTracks={playlist.tracks} />
        </Wrapper>
    );
}

const Wrapper = styled("div", {
    padding: "$800 $700",
    position: "relative",
});
