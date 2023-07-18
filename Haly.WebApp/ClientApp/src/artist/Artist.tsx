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
import FollowButton from "../profile/FollowButton";
import ArtistHighlights from "./ArtistHighlights";

function Artist() {
    const { id } = useParams();
    const query = useQuery(["artist", id], () => halyClient.artists.getArtist({ id: id! }));
    const appearsOnQuery = useQuery(["artist", id, "appearances"], () =>
        halyClient.artists.getArtistAppearances({ id: id! }),
    );

    const dominantColors = useAtomValue(dominantColorsAtom);

    if (!query.data) return <LoadingIndicator />;

    const { name, imageUrl, followersTotal, genres, highlightedPlaylist, topTracks } = query.data;
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
                <FollowButton />
            </PageControls>

            <ArtistHighlights tracks={topTracks} playlist={highlightedPlaylist} />

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
