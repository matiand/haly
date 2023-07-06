import { useQuery } from "@tanstack/react-query";
import { useAtomValue } from "jotai/index";
import { useParams } from "react-router-dom";

import { dominantColorsAtom } from "../common/atoms";
import CardCollection from "../common/CardCollection";
import LoadingIndicator from "../common/LoadingIndicator";
import PageControls from "../common/PageControls";
import PageHeader from "../common/PageHeader";
import { pluralize } from "../common/pluralize";
import { styled } from "../common/theme";
import halyClient from "../halyClient";
import PlaylistGradient from "../playlist/PlaylistGradient";
import FollowButton from "./FollowButton";

function Profile() {
    const { id } = useParams();

    const profileQuery = useQuery(["users", id], () => halyClient.users.getUser({ id: id! }));
    const playlistsQuery = useQuery(["users", id, "playlists"], () => halyClient.users.getPlaylists({ userId: id! }));
    const dominantColors = useAtomValue(dominantColorsAtom);

    if (!profileQuery.data) return <LoadingIndicator />;

    const { name, followersTotal, imageUrl } = profileQuery.data;
    const playlistTotal = playlistsQuery.data?.length ?? 0;
    const dominantColor = dominantColors[imageUrl ?? ""];

    return (
        <Wrapper>
            <PageHeader title={name} type="Profile" imageUrl={imageUrl} description={null}>
                {playlistTotal > 0 && <span>{formatPlaylistTotal(playlistTotal)}</span>}
                {followersTotal > 0 && <span>{pluralize("Follower", followersTotal)}</span>}
            </PageHeader>

            <PageControls>
                <FollowButton />
            </PageControls>

            <CardCollection title="Public Playlists" items={playlistsQuery.data ?? []} maxRows={2} />

            <PlaylistGradient color={dominantColor} type="major" />
            <PlaylistGradient color={dominantColor} type="minor" />
        </Wrapper>
    );
}

function formatPlaylistTotal(total: number) {
    return total === 50 ? "Over 50 Playlists" : pluralize("Public Playlist", total);
}

const Wrapper = styled("div", {
    padding: "$800 $700",
    position: "relative",
});

export default Profile;
