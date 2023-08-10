import { useQuery } from "@tanstack/react-query";
import { useAtomValue, useSetAtom } from "jotai";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

import { artistNameAtom, dominantColorsAtom, pageContextAtom } from "../common/atoms";
import LoadingIndicator from "../common/LoadingIndicator";
import PageControls from "../common/PageControls";
import PageHeader from "../common/PageHeader";
import { pluralize } from "../common/pluralize";
import halyClient from "../halyClient";
import PageGradient from "../playlist/PageGradient";
import FollowButton from "../profile/FollowButton";
import AppearsOn from "./AppearsOn";
import ArtistHighlights from "./ArtistHighlights";
import Discography from "./Discography";

function Artist() {
    const { id } = useParams();
    const query = useQuery(["artist", id], () => halyClient.artists.getArtist({ id: id! }));
    const dominantColors = useAtomValue(dominantColorsAtom);
    const setPageContext = useSetAtom(pageContextAtom);
    const setArtistName = useSetAtom(artistNameAtom);

    useEffect(() => {
        if (query.data) {
            const { name, imageUrl } = query.data;
            setPageContext({
                title: name,
                imageUrl: imageUrl,
            });
            setArtistName(name);
        }

        return () => setPageContext(null);
    }, [query, setPageContext, setArtistName]);

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

            <PageGradient color={dominantColor} type="major" />
            <PageGradient color={dominantColor} type="minor" />
        </div>
    );
}

export default Artist;
