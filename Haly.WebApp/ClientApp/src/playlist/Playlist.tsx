import { useQuery } from "@tanstack/react-query";
import { useAtomValue, useSetAtom } from "jotai";
import { useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";

import {
    dominantColorsAtom,
    isPlaylistCachedAtom,
    pageContextAtom,
    playlistDurationAtom,
    playlistSearchTermAtom,
    playlistSongsTotalAtom,
} from "../common/atoms";
import LoadingIndicator from "../common/LoadingIndicator";
import MoreOptionsButton from "../common/MoreOptionsButton";
import PageControls from "../common/PageControls";
import halyClient from "../halyClient";
import PlaybackToggle from "../playback/PlaybackToggle";
import SearchBar from "../search/SearchBar";
import PageGradient from "./PageGradient";
import PlaylistHeader from "./PlaylistHeader";
import PlaylistTracks from "./PlaylistTracks";

function Playlist() {
    const { id } = useParams();
    const query = usePlaylistQuery(id!);
    const dominantColors = useAtomValue(dominantColorsAtom);
    const setPageContext = useSetAtom(pageContextAtom);
    const setPlaylistSearchTerm = useSetAtom(playlistSearchTermAtom);
    const setDuration = useSetAtom(playlistDurationAtom);
    const setSongsTotal = useSetAtom(playlistSongsTotalAtom);

    useEffect(() => {
        if (query.data) {
            const { id, name, metadata } = query.data;
            setPageContext({
                title: name,
                imageUrl: metadata.imageUrl,
                onPlayback: () => {
                    console.log("Play:", id);
                },
            });

            setDuration(query.data.totalDuration);
            setSongsTotal(query.data.tracks.total);
        }

        return () => {
            setDuration("");
            setSongsTotal(0);
            setPageContext(null);
        };
    }, [query.data, setPageContext, setDuration, setSongsTotal]);

    useEffect(() => {
        setPlaylistSearchTerm("");
    }, [id, setPlaylistSearchTerm]);

    if (!query.data) {
        return <LoadingIndicator />;
    }

    const playlist = query.data;
    const dominantColor = dominantColors[playlist.metadata.imageUrl ?? ""];

    return (
        <div>
            <PlaylistHeader
                name={playlist.name}
                metadata={playlist.metadata}
                isPersonalized={playlist.isPersonalized}
            />
            <PageControls>
                <PlaybackToggle size="large" />
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

            <PlaylistTracks
                playlistId={playlist.id}
                initialTracks={playlist.tracks}
                initialDuration={playlist.totalDuration}
            />

            <PageGradient color={dominantColor} type="major" />
            <PageGradient color={dominantColor} type="minor" />
        </div>
    );
}

const usePlaylistQuery = (playlistId: string) => {
    const isCached = useAtomValue(useMemo(() => isPlaylistCachedAtom(playlistId), [playlistId]));

    // Playlist that are linked with our user are cached (i.e. appear in the sidebar). For those we
    // can use a GET request. For other playlists we need to use a PUT request to cache them first.
    const queryFn = useMemo(() => {
        return isCached
            ? () => halyClient.playlists.getPlaylist({ id: playlistId })
            : () =>
                  halyClient.playlists
                      .putPlaylist({ id: playlistId })
                      .then(() => halyClient.playlists.getPlaylist({ id: playlistId }));
    }, [playlistId, isCached]);

    return useQuery(["playlists", playlistId], queryFn);
};

export default Playlist;
