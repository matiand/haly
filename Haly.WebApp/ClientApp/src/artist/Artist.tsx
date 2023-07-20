import { useQuery } from "@tanstack/react-query";
import { useAtomValue } from "jotai";
import { useParams } from "react-router-dom";

import { dominantColorsAtom } from "../common/atoms";
import LoadingIndicator from "../common/LoadingIndicator";
import PageControls from "../common/PageControls";
import PageHeader from "../common/PageHeader";
import { pluralize } from "../common/pluralize";
import { styled } from "../common/theme";
import halyClient from "../halyClient";
import PlaylistGradient from "../playlist/PlaylistGradient";
import AppearsOn from "./AppearsOn";
import ArtistHighlights from "./ArtistHighlights";
import Discography from "./Discography";
import FollowArtistButton from "./FollowArtistButton";

function Artist() {
    const { id } = useParams();
    const query = useQuery(["artist", id], () => halyClient.artists.getArtist({ id: id! }));
    const dominantColors = useAtomValue(dominantColorsAtom);

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
        <Wrapper>
            <PageHeader title={name} type="Artist" imageUrl={imageUrl} description={null}>
                {followersTotal > 0 && (
                    <span>
                        <strong>{pluralize("Follower", followersTotal)}</strong>
                    </span>
                )}
                {genres.map((g) => (
                    <span key={g}>{g}</span>
                ))}
            </PageHeader>

            <PageControls>
                <FollowArtistButton artistId={artistId} initialIsFollowing={isFollowed} />
            </PageControls>

            <ArtistHighlights tracks={topTracks} playlist={highlightedPlaylist} />
            <Discography artistId={artistId} />
            <AppearsOn artistId={artistId} />

            <PlaylistGradient color={dominantColor} type="major" />
            <PlaylistGradient color={dominantColor} type="minor" />
        </Wrapper>
    );
}

const Wrapper = styled("div", {
    padding: "$800 $700",
    position: "relative",
});

export default Artist;
