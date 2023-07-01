import { useQuery } from "@tanstack/react-query";
import { useAtomValue, useSetAtom } from "jotai";
import { useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";

import { dominantColorsAtom, isPlaylistCachedAtom, pageContextAtom } from "../common/atoms";
import LoadingIndicator from "../common/LoadingIndicator";
import { styled } from "../common/theme";
import halyClient from "../halyClient";
import PlaylistControls from "./PlaylistControls";
import PlaylistGradient from "./PlaylistGradient";
import PlaylistHeader from "./PlaylistHeader";
import PlaylistTracks from "./PlaylistTracks";

function Playlist() {
    const { id } = useParams();
    const query = usePlaylistQuery(id!);
    const dominantColors = useAtomValue(dominantColorsAtom);
    const setPageContext = useSetAtom(pageContextAtom);

    useEffect(() => {
        if (query.data) {
            setPageContext(query.data);
        }

        return () => setPageContext(null);
    }, [query.data, setPageContext]);

    if (!query.data) {
        return <LoadingIndicator />;
    }

    const playlist = query.data;
    const songsCount = playlist.tracks.total;
    const totalDuration = playlist.totalDuration;
    const dominantColor = dominantColors[playlist.metadata.imageUrl ?? ""];

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
            <PlaylistControls name={playlist.name} />
            <PlaylistTracks playlistId={playlist.id} initialTracks={playlist.tracks} />

            <PlaylistGradient color={dominantColor} type="major" />
            <PlaylistGradient color={dominantColor} type="minor" />
        </Wrapper>
    );
}

const usePlaylistQuery = (playlistId: string) => {
    const isCached = useAtomValue(useMemo(() => isPlaylistCachedAtom(playlistId), [playlistId]));

    // Playlist that are linked with our user are cached (i.e. appear in the sidebar). For those we
    // can use a GET request. For other playlists we need to use a PUT request to cache them first.
    const queryFn = useMemo(() => {
        return isCached
            ? () => halyClient.playlists.getPlaylist({ id: playlistId })
            : () => halyClient.playlists.putPlaylist({ id: playlistId });
    }, [playlistId, isCached]);

    return useQuery(["playlists", playlistId], queryFn);
};

const Wrapper = styled("div", {
    padding: "$800 $700",
    position: "relative",
});

export default Playlist;
