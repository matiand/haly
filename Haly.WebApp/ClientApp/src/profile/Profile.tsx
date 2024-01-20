import { useQuery } from "@tanstack/react-query";
import { useAtomValue } from "jotai";
import { LuMusic } from "react-icons/lu";
import { useParams } from "react-router-dom";

import { dominantColorsAtom } from "../common/atoms/pageAtoms";
import { pluralize } from "../common/pluralize";
import halyClient from "../halyClient";
import PageGradient from "../playlist/PageGradient";
import { CardProps } from "../ui/card/Card";
import ResizableCardGroup from "../ui/card/ResizableCardGroup";
import EmptyState from "../ui/EmptyState";
import LoadingIndicator from "../ui/LoadingIndicator";
import PageControls from "../ui/PageControls";
import PageHeader from "../ui/PageHeader";
import FollowCreatorButton from "./FollowCreatorButton";

function Profile() {
    const { id } = useParams();

    const profileQuery = useQuery(["users", id], () => halyClient.users.getUser({ id: id! }));
    const playlistsQuery = useQuery(["users", id, "playlists"], () => halyClient.users.getPlaylists({ userId: id! }));
    const dominantColors = useAtomValue(dominantColorsAtom);

    if (!profileQuery.data) return <LoadingIndicator />;

    const { id: userId, name, followersTotal, imageUrl, isFollowed } = profileQuery.data;
    const playlistTotal = playlistsQuery.data?.length ?? 0;
    const dominantColor = dominantColors[imageUrl ?? ""];

    const playlistCards: CardProps[] = (playlistsQuery.data ?? []).map((p) => {
        return {
            id: p.id,
            name: p.name,
            uri: `spotify:playlist:${p.id}`,
            href: `/playlist/${p.id}`,
            imageUrl: p.imageUrl,
        };
    });

    return (
        <div>
            <PageHeader title={name} type="Profile" imageUrl={imageUrl} description={null}>
                {playlistTotal > 0 && <span>{formatPlaylistTotal(playlistTotal)}</span>}
                {followersTotal > 0 && <span>{pluralize("Follower", followersTotal)}</span>}
            </PageHeader>

            <PageControls>
                <FollowCreatorButton creatorId={userId} initialValue={isFollowed} type="User" />
            </PageControls>

            {playlistTotal > 0 ? (
                <ResizableCardGroup title="Public Playlists" items={playlistCards} maxRows={2} href="playlists" />
            ) : (
                <EmptyState title="User has no public playlists" icon={<LuMusic />} />
            )}

            <PageGradient color={dominantColor} type="major" />
            <PageGradient color={dominantColor} type="minor" />
        </div>
    );
}

function formatPlaylistTotal(total: number) {
    return total === 50 ? "Over 50 Playlists" : pluralize("Public Playlist", total);
}

export default Profile;
