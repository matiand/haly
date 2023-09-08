import { useQuery } from "@tanstack/react-query";

import halyClient from "../halyClient";
import PlaybackToggle from "../playback/PlaybackToggle";
import PlaylistHeader from "../playlist/PlaylistHeader";
import PlaylistTracks from "../playlist/PlaylistTracks";
import SearchBar from "../search/SearchBar";
import LoadingIndicator from "../ui/LoadingIndicator";
import PageControls from "../ui/PageControls";

type LikedSongsCollectionProps = {
    id: string;
};

export function LikedSongsCollection({ id }: LikedSongsCollectionProps) {
    const query = useQuery(["playlists", id], () => halyClient.playlists.getPlaylist({ id }));

    if (!query.data) {
        return <LoadingIndicator />;
    }

    const playlist = query.data;

    return (
        <div>
            <PlaylistHeader
                name={playlist.name}
                description={playlist.description}
                imageUrl={playlist.imageUrl}
                likesTotal={playlist.likesTotal}
                songsTotal={playlist.tracks.total}
                duration={playlist.totalDuration}
                owner={playlist.owner}
                isPersonalized={playlist.isPersonalized}
            />

            <PageControls>
                <PlaybackToggle size="large" />
                <SearchBar variant="playlist" />
            </PageControls>

            <PlaylistTracks playlistId={playlist.id} initialTracks={playlist.tracks} sortOrder="added_at_desc" />
        </div>
    );
}
