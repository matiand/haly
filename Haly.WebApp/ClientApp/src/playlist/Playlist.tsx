import { useQuery } from "@tanstack/react-query";
import { useAtomValue, useSetAtom } from "jotai";
import { useEffect } from "react";

import { pageContextAtom, pageDominantColorAtom } from "../common/atoms/pageAtoms";
import { playlistSearchTermAtom } from "../common/atoms/playlistAtoms";
import { userIdAtom } from "../common/atoms/userAtoms";
import { GetPlaylistQueryKey } from "../common/queryKeys";
import halyClient from "../halyClient";
import useContextMenu from "../menus/useContextMenu";
import PlaybackToggle from "../playback/PlaybackToggle";
import useContextPlaybackState from "../playback/useContextPlaybackState";
import { useContextPlaybackActions } from "../playback/usePlaybackActions";
import SearchBar from "../search/SearchBar";
import HeartButton from "../ui/HeartButton";
import PageControls from "../ui/PageControls";
import PlaylistButtonMenu from "./menus/PlaylistButtonMenu";
import PlaylistContextMenu from "./menus/PlaylistContextMenu";
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

    const setPageContext = useSetAtom(pageContextAtom);
    const setPlaylistSearchTerm = useSetAtom(playlistSearchTermAtom);
    const userId = useAtomValue(userIdAtom);
    const dominantColor = useAtomValue(pageDominantColorAtom);

    const { onContextMenu, menuProps } = useContextMenu();

    const getPlaybackState = useContextPlaybackState();
    const playbackState = getPlaybackState(id, isLikedSongsCollection);
    const { playbackAction } = useContextPlaybackActions(playbackState);

    useEffect(() => {
        if (query.data) {
            const { owner } = query.data;
            setPageContext(
                isLikedSongsCollection
                    ? {
                          type: "collection",
                          data: query.data,
                      }
                    : {
                          type: "playlist",
                          data: query.data,
                          isEditable: owner.id === userId,
                      },
            );
        }
    }, [query.data, isLikedSongsCollection, userId, setPageContext]);

    useEffect(() => {
        return () => {
            setPageContext(null);
            setPlaylistSearchTerm("");
        };
    }, [id, setPageContext, setPlaylistSearchTerm]);

    if (!query.data) return null;

    const playlist = query.data;

    const hasTracks = query.data.tracks.total > 0;
    const isEditable = playlist.owner.id === userId && !isLikedSongsCollection;
    const isFollowable = playlist.owner.id !== userId;

    return (
        <div>
            <PlaylistHeader playlist={playlist} onContextMenu={onContextMenu} isEditable={isEditable} />
            <PageControls>
                {hasTracks && (
                    <PlaybackToggle size="large" isPaused={playbackState !== "playing"} toggle={playbackAction} />
                )}

                {isFollowable && (
                    <HeartButton
                        // Force rerender when the state was modified outside of the component (e.g. using a menu).
                        key={isInLibrary ? 1 : 0}
                        params={{
                            type: "playlist",
                            id: playlist.id,
                        }}
                        state={isInLibrary}
                    />
                )}

                <PlaylistButtonMenu playlist={playlist} isLikedSongsCollection={isLikedSongsCollection} />

                {hasTracks && (
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
                )}
            </PageControls>

            {hasTracks && (
                <PlaylistTracks
                    playlistId={playlist.id}
                    sortOrder={sortOrder}
                    initialTracks={playlist.tracks}
                    isLikedSongsCollection={isLikedSongsCollection}
                />
            )}

            <PageGradient color={dominantColor} type="major" />
            <PageGradient color={dominantColor} type="minor" />

            <PlaylistContextMenu
                playlist={playlist}
                menuProps={menuProps}
                isLikedSongsCollection={isLikedSongsCollection}
            />
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
