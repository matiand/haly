import { useQuery } from "@tanstack/react-query";
import { useAtomValue, useSetAtom } from "jotai";
import { useEffect, useMemo } from "react";

import {
    dominantColorsAtom,
    isPlaylistCachedAtom,
    pageContextAtom,
    playlistSearchTermAtom,
    streamedPlaylistIdAtom,
    userIdAtom,
} from "../common/atoms";
import halyClient from "../halyClient";
import PlaybackToggle from "../playback/PlaybackToggle";
import SearchBar from "../search/SearchBar";
import HeartButton from "../ui/HeartButton";
import LoadingIndicator from "../ui/LoadingIndicator";
import MoreOptionsButton from "../ui/MoreOptionsButton";
import PageControls from "../ui/PageControls";
import PageGradient from "./PageGradient";
import PlaylistHeader from "./PlaylistHeader";
import PlaylistTracks from "./PlaylistTracks";
import useIsPlaylistInLibrary from "./useIsPlaylistInLibrary";
import { PlaylistSortOrder } from "./useSortOrder";

function Playlist({ id, sortOrder }: { id: string; sortOrder: PlaylistSortOrder }) {
    const isInLibrary = useIsPlaylistInLibrary(id);
    const query = usePlaylistQuery(id, sortOrder, isInLibrary);
    const dominantColors = useAtomValue(dominantColorsAtom);
    const streamedPlaylistId = useAtomValue(streamedPlaylistIdAtom);
    const setPageContext = useSetAtom(pageContextAtom);
    const setPlaylistSearchTerm = useSetAtom(playlistSearchTermAtom);
    const userId = useAtomValue(userIdAtom);

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
    const isListenedTo = streamedPlaylistId === id;
    const isOwnedByCurrentUser = playlist.owner.id === userId;

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
                {!isOwnedByCurrentUser && (
                    <HeartButton entityId={playlist.id} type="playlist" initialState={isInLibrary} />
                )}
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

const usePlaylistQuery = (playlistId: string, sortOrder: PlaylistSortOrder, isInLibrary: boolean) => {
    // Playlist that belong to current user's library are cached (i.e. those in the sidebar). For
    // those we can use a GET request. For other playlists we need to use a PUT request to cache
    // them first.
    const queryFn = useMemo(() => {
        return isInLibrary
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
    }, [playlistId, sortOrder, isInLibrary]);

    return useQuery(["playlists", playlistId, { isInLibrary, sortOrder }], queryFn, { keepPreviousData: true });
};

export default Playlist;
