import { useQuery } from "@tanstack/react-query";
import { useAtomValue, useSetAtom } from "jotai";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

import { lastArtistNameAtom, pageContextAtom, pageDominantColorAtom } from "../common/atoms/pageAtoms";
import { pluralize } from "../common/pluralize";
import halyClient from "../halyClient";
import PlaybackToggle from "../playback/PlaybackToggle";
import useContextPlaybackState from "../playback/useContextPlaybackState";
import { useContextPlaybackActions } from "../playback/usePlaybackActions";
import PageGradient from "../playlist/PageGradient";
import FollowCreatorButton from "../profile/FollowCreatorButton";
import LoadingIndicator from "../ui/LoadingIndicator";
import PageControls from "../ui/PageControls";
import PageHeader from "../ui/PageHeader";
import AppearsOn from "./AppearsOn";
import ArtistHighlights from "./ArtistHighlights";
import Discography from "./Discography";

function Artist() {
    const { id } = useParams();
    const query = useQuery(["artist", id], () => halyClient.artists.getArtist({ id: id! }));

    const setPageContext = useSetAtom(pageContextAtom);
    const setArtistName = useSetAtom(lastArtistNameAtom);
    const dominantColor = useAtomValue(pageDominantColorAtom);

    const getPlaybackState = useContextPlaybackState();
    const playbackState = getPlaybackState(id!);
    const { playbackAction } = useContextPlaybackActions(playbackState);

    useEffect(() => {
        if (query.data) {
            setArtistName(query.data.name);

            setPageContext({
                type: "artist",
                data: query.data,
            });
        }

        return () => setPageContext(null);
    }, [query, setArtistName, setPageContext]);

    if (!query.data) return <LoadingIndicator />;

    const {
        id: artistId,
        name,
        imageUrl,
        followersTotal,
        genres,
        highlightedPlaylist,
        topTracks,
        isFollowed,
    } = query.data;

    return (
        <div>
            <PageHeader title={name} type="Artist" imageUrl={imageUrl} description={null}>
                {followersTotal > 0 && (
                    <span>
                        <strong>{pluralize("Follower", followersTotal)}</strong>
                    </span>
                )}
                {genres.map((g) => (
                    <span style={{ userSelect: "text" }} key={g}>
                        {g}
                    </span>
                ))}
            </PageHeader>

            <PageControls>
                <PlaybackToggle size="large" isPaused={playbackState !== "playing"} toggle={playbackAction} />
                <FollowCreatorButton creatorId={artistId} initialValue={isFollowed} type="Artist" />
            </PageControls>

            <ArtistHighlights artistId={artistId} tracks={topTracks} playlist={highlightedPlaylist} />
            <Discography artistId={artistId} />
            <AppearsOn artistId={artistId} />

            <PageGradient color={dominantColor} type="major" />
            <PageGradient color={dominantColor} type="minor" />
        </div>
    );
}

export default Artist;
