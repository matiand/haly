import { useQuery } from "@tanstack/react-query";
import { useAtomValue, useSetAtom } from "jotai";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

import { pageContextAtom, pageDominantColorAtom } from "../common/atoms/pageAtoms";
import halyClient from "../halyClient";
import useContextMenu from "../menus/useContextMenu";
import PlaybackToggle from "../playback/PlaybackToggle";
import useContextPlaybackState from "../playback/useContextPlaybackState";
import { useContextPlaybackActions } from "../playback/usePlaybackActions";
import PageGradient from "../playlist/PageGradient";
import AlbumTable from "../table/album/AlbumTable";
import LoadingIndicator from "../ui/LoadingIndicator";
import PageControls from "../ui/PageControls";
import AlbumHeartButton from "./AlbumHeartButton";
import Copyrights from "./Copyrights";
import AlbumButtonMenu from "./menus/AlbumButtonMenu";
import AlbumContextMenu from "./menus/AlbumContextMenu";
import AlbumHeader from "./menus/AlbumHeader";
import SimilarAlbums from "./SimilarAlbums";

function Album() {
    const { id } = useParams();
    const query = useQuery(["albums", id], () => halyClient.albums.getAlbum({ id: id! }));

    const setPageContext = useSetAtom(pageContextAtom);
    const dominantColor = useAtomValue(pageDominantColorAtom);

    const { onContextMenu, menuProps } = useContextMenu();

    const getPlaybackState = useContextPlaybackState();
    const playbackState = getPlaybackState(id!);
    const { playbackAction } = useContextPlaybackActions(playbackState);

    useEffect(() => {
        if (query.data) {
            setPageContext({
                type: "album",
                data: query.data,
            });
        }

        return () => setPageContext(null);
    }, [query, setPageContext]);

    if (!query.data) return <LoadingIndicator />;

    const { id: albumId, tracks, formattedReleaseDate, copyrights } = query.data;

    const isPlayable = tracks.some((t) => t.isPlayable);

    return (
        <div>
            <AlbumHeader album={query.data} onContextMenu={onContextMenu} draggableData={{ name: "blablabla" }} />

            <PageControls>
                {isPlayable && (
                    <PlaybackToggle size="large" isPaused={playbackState !== "playing"} toggle={playbackAction} />
                )}
                <AlbumHeartButton albumId={albumId} />
                <AlbumButtonMenu album={query.data} />
            </PageControls>

            <AlbumTable albumId={albumId} items={tracks} />
            <Copyrights text={copyrights} date={formattedReleaseDate} />

            {albumId && <SimilarAlbums albumId={albumId} trackIds={tracks.map((t) => t.id)} />}

            <PageGradient color={dominantColor} type="major" />
            <PageGradient color={dominantColor} type="minor" />

            <AlbumContextMenu album={query.data} menuProps={menuProps} />
        </div>
    );
}

export default Album;
