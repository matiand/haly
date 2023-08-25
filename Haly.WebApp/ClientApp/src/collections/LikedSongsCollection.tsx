import { useQuery } from "@tanstack/react-query";

import LoadingIndicator from "../common/LoadingIndicator";
import PageControls from "../common/PageControls";
import halyClient from "../halyClient";
import PlaybackToggle from "../playback/PlaybackToggle";
import PlaylistHeader from "../playlist/PlaylistHeader";
import PlaylistTracks from "../playlist/PlaylistTracks";
import SearchBar from "../search/SearchBar";

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
                owner={playlist.owner}
                isPersonalized={playlist.isPersonalized}
            />

            <PageControls>
                <PlaybackToggle size="large" />
                <SearchBar variant="playlist" />
            </PageControls>

            <PlaylistTracks
                playlistId={playlist.id}
                initialTracks={playlist.tracks}
                initialDuration={playlist.totalDuration}
            />
        </div>
    );
}
