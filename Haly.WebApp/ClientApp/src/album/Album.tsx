import { useQuery } from "@tanstack/react-query";
import { useAtomValue, useSetAtom } from "jotai";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";

import { dominantColorsAtom, pageContextAtom, selectedTrackIndicesAtom } from "../common/atoms";
import { pluralize } from "../common/pluralize";
import { useContextPlaybackActions } from "../common/usePlaybackActions";
import halyClient from "../halyClient";
import PlaybackToggle from "../playback/PlaybackToggle";
import useContextPlaybackState from "../playback/useContextPlaybackState";
import PageGradient from "../playlist/PageGradient";
import AlbumTable from "../table/album/AlbumTable";
import LoadingIndicator from "../ui/LoadingIndicator";
import MoreOptionsButton from "../ui/MoreOptionsButton";
import PageControls from "../ui/PageControls";
import PageHeader from "../ui/PageHeader";
import Copyrights from "./Copyrights";
import SimilarAlbums from "./SimilarAlbums";

function Album() {
    const { id } = useParams();
    const query = useQuery(["albums", id], () => halyClient.albums.getAlbum({ id: id! }));
    const dominantColors = useAtomValue(dominantColorsAtom);
    const setPageContext = useSetAtom(pageContextAtom);
    const setSelectedTrackIndices = useSetAtom(selectedTrackIndicesAtom);

    const getPlaybackState = useContextPlaybackState();
    const playbackState = getPlaybackState(id!);
    const { togglePlayback } = useContextPlaybackActions(playbackState);

    useEffect(() => {
        if (query.data) {
            const { id, name, imageUrl } = query.data;
            setPageContext({
                id,
                type: "album",
                title: name,
                imageUrl: imageUrl,
            });
        }

        return () => setPageContext(null);
    }, [query, setPageContext]);

    useEffect(() => {
        return () => setSelectedTrackIndices([]);
    }, [setSelectedTrackIndices]);

    if (!query.data) return <LoadingIndicator />;

    const {
        id: albumId,
        name,
        type,
        imageUrl,
        totalDuration,
        tracks,
        artists,
        releaseYear,
        formattedReleaseDate,
        copyrights,
    } = query.data;

    const dominantColor = dominantColors[imageUrl ?? ""];
    const isPlayable = tracks.some((t) => t.isPlayable);

    return (
        <div>
            <PageHeader title={name} subtitle={type} type="Album" imageUrl={imageUrl} description={null}>
                {artists.map((a) => {
                    const artistHref = `/artist/${a.id}`;
                    if (a.name === "Various Artists") {
                        return <span key={a.id}>{a.name}</span>;
                    }

                    return (
                        <span key={a.id}>
                            <Link to={artistHref}>
                                <strong>{a.name}</strong>
                            </Link>
                        </span>
                    );
                })}
                <span>{releaseYear}</span>
                <span>
                    {pluralize("song", tracks.length)}, <span>{totalDuration}</span>
                </span>
            </PageHeader>

            <PageControls>
                {isPlayable && (
                    <PlaybackToggle size="large" isPaused={playbackState !== "playing"} toggle={togglePlayback} />
                )}
                <MoreOptionsButton label={`More options for album: '${name}'`} type="album" />
            </PageControls>

            <AlbumTable albumId={albumId} items={tracks} />
            <Copyrights text={copyrights} date={formattedReleaseDate} />

            {albumId && <SimilarAlbums albumId={albumId} trackIds={tracks.map((t) => t.id)} />}

            <PageGradient color={dominantColor} type="major" />
            <PageGradient color={dominantColor} type="minor" />
        </div>
    );
}

export default Album;
