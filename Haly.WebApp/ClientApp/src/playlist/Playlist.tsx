import { useQuery } from "@tanstack/react-query";
import { useAtomValue, useSetAtom } from "jotai";
import { useEffect } from "react";

import { dominantColorsAtom, pageContextAtom, playlistSearchTermAtom, userIdAtom } from "../common/atoms";
import { GetPlaylistQueryKey } from "../common/queryKeys";
import { theme } from "../common/theme";
import halyClient from "../halyClient";
import useContextMenu from "../menus/useContextMenu";
import PlaybackToggle from "../playback/PlaybackToggle";
import useContextPlaybackState from "../playback/useContextPlaybackState";
import { useContextPlaybackActions } from "../playback/usePlaybackActions";
import SearchBar from "../search/SearchBar";
import HeartButton from "../ui/HeartButton";
import MoreOptionsButton from "../ui/MoreOptionsButton";
import PageControls from "../ui/PageControls";
import PageGradient from "./PageGradient";
import PlaylistHeader from "./PlaylistHeader";
import PlaylistTracks from "./PlaylistTracks";
import { PlaylistSortOrder } from "./usePlaylistSortOrder";

type PlaylistProps = {
    id: string;
    sortOrder: PlaylistSortOrder;
    isInLibrary: boolean;
    isLikedSongsCollection: boolean;
};

function Playlist({ id, sortOrder, isInLibrary, isLikedSongsCollection }: PlaylistProps) {
    const query = usePlaylistQuery(id, sortOrder);
    const dominantColors = useAtomValue(dominantColorsAtom);
    const setPageContext = useSetAtom(pageContextAtom);
    const setPlaylistSearchTerm = useSetAtom(playlistSearchTermAtom);
    const userId = useAtomValue(userIdAtom);
    const { onContextMenu, menuProps } = useContextMenu();

    const contextId = isLikedSongsCollection ? "collection" : id;
    const getPlaybackState = useContextPlaybackState();
    const playbackState = getPlaybackState(contextId);
    const { playbackAction } = useContextPlaybackActions(playbackState);

    useEffect(() => {
        if (query.data) {
            const { name, imageUrl } = query.data;
            setPageContext({
                id: contextId,
                type: isLikedSongsCollection ? "user" : "playlist",
                title: name,
                imageUrl: imageUrl,
            });
        }
    }, [query.data, contextId, isLikedSongsCollection, setPageContext]);

    useEffect(() => {
        return () => {
            setPageContext(null);
            setPlaylistSearchTerm("");
        };
    }, [id, setPageContext, setPlaylistSearchTerm]);

    if (!query.data) return null;

    const playlist = query.data;

    const hasTracks = query.data.tracks.total > 0;
    const isOwnedByCurrentUser = playlist.owner.id === userId;
    const dominantColor = isLikedSongsCollection
        ? theme.colors.dominantLikedSongs
        : dominantColors[playlist.imageUrl ?? ""];

    if (!hasTracks) {
        return (
            <div>
                <PlaylistHeader playlist={playlist} onContextMenu={onContextMenu} />
                <PageControls>
                    {!isLikedSongsCollection && (
                        <MoreOptionsButton label={`More options for playlist ${playlist.name}`} type="playlist" />
                    )}
                </PageControls>

                <PageGradient color={dominantColor} type="major" />
                <PageGradient color={dominantColor} type="minor" />
            </div>
        );
    }

    return (
        <div>
            <PlaylistHeader playlist={playlist} onContextMenu={onContextMenu} />
            <PageControls>
                <PlaybackToggle size="large" isPaused={playbackState !== "playing"} toggle={playbackAction} />

                {!isOwnedByCurrentUser && (
                    <HeartButton
                        params={{
                            type: "playlist",
                            id: playlist.id,
                        }}
                        initialState={isInLibrary}
                    />
                )}

                {!isLikedSongsCollection && (
                    <MoreOptionsButton label={`More options for playlist ${playlist.name}`} type="playlist" />
                )}

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

            <PlaylistTracks
                playlistId={playlist.id}
                sortOrder={sortOrder}
                initialTracks={playlist.tracks}
                isLikedSongsCollection={isLikedSongsCollection}
            />

            <PageGradient color={dominantColor} type="major" />
            <PageGradient color={dominantColor} type="minor" />
        </div>
    );
}

function usePlaylistQuery(playlistId: string, sortOrder: PlaylistSortOrder) {
    return useQuery(
        GetPlaylistQueryKey(playlistId, sortOrder),
        () =>
            halyClient.playlists.getPlaylist({
                id: playlistId,
                sortOrder: sortOrder,
            }),
        { keepPreviousData: true },
    );
}

export default Playlist;
