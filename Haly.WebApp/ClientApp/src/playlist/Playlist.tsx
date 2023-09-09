import { useQuery } from "@tanstack/react-query";
import { useAtomValue, useSetAtom } from "jotai";
import { useEffect, useMemo } from "react";

import {
    dominantColorsAtom,
    isPlaylistCachedAtom,
    pageContextAtom,
    playbackContextAtom,
    playlistSearchTermAtom,
} from "../common/atoms";
import halyClient from "../halyClient";
import PlaybackToggle from "../playback/PlaybackToggle";
import SearchBar from "../search/SearchBar";
import LoadingIndicator from "../ui/LoadingIndicator";
import MoreOptionsButton from "../ui/MoreOptionsButton";
import PageControls from "../ui/PageControls";
import PageGradient from "./PageGradient";
import PlaylistHeader from "./PlaylistHeader";
import PlaylistTracks from "./PlaylistTracks";
import { PlaylistSortOrder } from "./useSortOrder";

function Playlist({ id, sortOrder }: { id: string; sortOrder: PlaylistSortOrder }) {
    const query = usePlaylistQuery(id, sortOrder);
    const dominantColors = useAtomValue(dominantColorsAtom);
    const playbackContext = useAtomValue(playbackContextAtom);
    const setPageContext = useSetAtom(pageContextAtom);
    const setPlaylistSearchTerm = useSetAtom(playlistSearchTermAtom);

    useEffect(() => {
        if (query.data) {
            const { id, name, imageUrl } = query.data;
            setPageContext({
                title: name,
                imageUrl: imageUrl,
                onPlayback: () => {
                    console.log("Play:", id);
                },
            });
        }
    }, [query.data, setPageContext]);

    useEffect(() => {
        return () => {
            setPageContext(null);
            setPlaylistSearchTerm("");
        };
    }, [id, setPageContext, setPlaylistSearchTerm]);

    if (!query.data) {
        return <LoadingIndicator />;
    }

    const playlist = query.data;
    const dominantColor = dominantColors[playlist.imageUrl ?? ""];
    const hasTracks = query.data.tracks.total > 0;
    const isListenedTo = playbackContext?.entityId === id;

    if (!hasTracks) {
        return (
            <div>
                <PlaylistHeader
                    key={playlist.id}
                    name={playlist.name}
                    description={playlist.description}
                    imageUrl={playlist.imageUrl}
                    likesTotal={playlist.likesTotal}
                    duration={playlist.totalDuration}
                    songsTotal={playlist.tracks.total}
                    owner={playlist.owner}
                    isPersonalized={playlist.isPersonalized}
                />
                <PageControls>
                    <MoreOptionsButton label={`More options for playlist ${playlist.name}`} size="medium" />
                </PageControls>

                <PageGradient color={dominantColor} type="major" />
                <PageGradient color={dominantColor} type="minor" />
            </div>
        );
    }

    return (
        <div>
            <PlaylistHeader
                name={playlist.name}
                description={playlist.description}
                imageUrl={playlist.imageUrl}
                likesTotal={playlist.likesTotal}
                duration={playlist.totalDuration}
                songsTotal={playlist.tracks.total}
                owner={playlist.owner}
                isPersonalized={playlist.isPersonalized}
            />
            <PageControls>
                <PlaybackToggle size="large" isPaused={!isListenedTo} toggle={() => 1} />
                <MoreOptionsButton label={`More options for playlist ${playlist.name}`} size="medium" />
                <SearchBar
                    variant="playlist"
                    onChange={(text) => {
                        // We need to check if our text is a valid RegExp
                        try {
                            new RegExp(text);
                            setPlaylistSearchTerm(text);
                            // Don't update it if it fails validation
                            // eslint-disable-next-line no-empty
                        } catch (e) {}
                    }}
                />
            </PageControls>

            <PlaylistTracks playlistId={playlist.id} sortOrder={sortOrder} initialTracks={playlist.tracks} />

            <PageGradient color={dominantColor} type="major" />
            <PageGradient color={dominantColor} type="minor" />
        </div>
    );
}

const usePlaylistQuery = (playlistId: string, sortOrder: PlaylistSortOrder) => {
    const isCached = useAtomValue(useMemo(() => isPlaylistCachedAtom(playlistId), [playlistId]));

    // Playlist that are linked with our user are cached (i.e. appear in the sidebar). For those we
    // can use a GET request. For other playlists we need to use a PUT request to cache them first.
    const queryFn = useMemo(() => {
        return isCached
            ? () =>
                  halyClient.playlists.getPlaylist({
                      id: playlistId,
                      sortOrder,
                  })
            : () =>
                  halyClient.playlists.putPlaylist({ id: playlistId }).then(() =>
                      halyClient.playlists.getPlaylist({
                          id: playlistId,
                          sortOrder,
                      }),
                  );
    }, [playlistId, sortOrder, isCached]);

    return useQuery(["playlists", playlistId, { sortOrder }], queryFn, { keepPreviousData: true });
};

export default Playlist;
