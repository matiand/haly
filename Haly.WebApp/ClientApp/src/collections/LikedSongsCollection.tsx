import { useQuery } from "@tanstack/react-query";

import LoadingIndicator from "../common/LoadingIndicator";
import MoreOptionsButton from "../common/MoreOptionsButton";
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
                owner={playlist.metadata.owner}
                songsCount={songsCount}
                totalDuration={totalDuration}
            />
            <PageControls>
                <PlaybackToggle size="large" />
                <MoreOptionsButton label={`More options for playlist ${playlist.name}`} size="medium" />
                <SearchBar variant="playlist" />
            </PageControls>
            <PlaylistTracks playlistId={playlist.id} initialTracks={playlist.tracks} />
        </Wrapper>
    );
}

const Wrapper = styled("div", {
    position: "relative",
});
