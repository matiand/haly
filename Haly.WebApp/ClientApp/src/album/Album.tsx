import { useQuery } from "@tanstack/react-query";
import { useSetAtom } from "jotai";
import { useAtomValue } from "jotai/index";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";

import { dominantColorsAtom, pageContextAtom } from "../common/atoms";
import HeartButton from "../common/HeartButton";
import LoadingIndicator from "../common/LoadingIndicator";
import MoreOptionsButton from "../common/MoreOptionsButton";
import PageControls from "../common/PageControls";
import PageHeader from "../common/PageHeader";
import { pluralize } from "../common/pluralize";
import halyClient from "../halyClient";
import PlaybackToggle from "../playback/PlaybackToggle";
import PageGradient from "../playlist/PageGradient";
import AlbumTable from "../table/AlbumTable";
import Copyrights from "./Copyrights";

function Album() {
    const { id } = useParams();
    const query = useQuery(["albums", id], () => halyClient.albums.getAlbum({ id: id! }));
    const dominantColors = useAtomValue(dominantColorsAtom);
    const setPageContext = useSetAtom(pageContextAtom);

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

        return () => setPageContext(null);
    }, [query, setPageContext]);

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
                {isPlayable && <PlaybackToggle size="large" />}
                <HeartButton size="medium" />
                <MoreOptionsButton label={`More options for album: '${name}'`} size="medium" />
            </PageControls>

            <AlbumTable items={tracks} />
            <Copyrights text={copyrights} date={formattedReleaseDate} />

            <PageGradient color={dominantColor} type="major" />
            <PageGradient color={dominantColor} type="minor" />
        </div>
    );
}

export default Album;
