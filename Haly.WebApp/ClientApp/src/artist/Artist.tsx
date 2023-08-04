import { useQuery } from "@tanstack/react-query";
import { useAtomValue, useSetAtom } from "jotai";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

import { artistNameAtom, dominantColorsAtom } from "../common/atoms";
import LoadingIndicator from "../common/LoadingIndicator";
import PageControls from "../common/PageControls";
import PageHeader from "../common/PageHeader";
import { pluralize } from "../common/pluralize";
import halyClient from "../halyClient";
import PlaylistGradient from "../playlist/PlaylistGradient";
import FollowButton from "../profile/FollowButton";
import AppearsOn from "./AppearsOn";
import ArtistHighlights from "./ArtistHighlights";
import Discography from "./Discography";

function Artist() {
    const { id } = useParams();
    const query = useQuery(["artist", id], () => halyClient.artists.getArtist({ id: id! }));
    const dominantColors = useAtomValue(dominantColorsAtom);
    const setArtistName = useSetAtom(artistNameAtom);

    useEffect(() => {
        setArtistName(query.data?.name ?? null);
    }, [query, setArtistName]);

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
    const dominantColor = dominantColors[imageUrl ?? ""];

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
                <FollowButton creatorId={artistId} initialValue={isFollowed} type="Artist" />
            </PageControls>

            <ArtistHighlights tracks={topTracks} playlist={highlightedPlaylist} />
            <Discography artistId={artistId} />
            <AppearsOn artistId={artistId} />

            <PlaylistGradient color={dominantColor} type="major" />
            <PlaylistGradient color={dominantColor} type="minor" />
        </div>
    );
}

export default Artist;
