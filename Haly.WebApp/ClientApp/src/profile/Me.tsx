import { useQuery } from "@tanstack/react-query";
import { useAtomValue } from "jotai";

import { dominantColorsAtom } from "../common/atoms/pageAtoms";
import { cachedPlaylistsAtom } from "../common/atoms/playlistAtoms";
import { userIdAtom } from "../common/atoms/userAtoms";
import { capitalize } from "../common/capitalize";
import { pluralize } from "../common/pluralize";
import halyClient from "../halyClient";
import PageGradient from "../playlist/PageGradient";
import { CardProps } from "../ui/card/Card";
import ResizableCardGroup from "../ui/card/ResizableCardGroup";
import LoadingIndicator from "../ui/LoadingIndicator";
import PageControls from "../ui/PageControls";
import PageHeader from "../ui/PageHeader";

function Me() {
    const userId = useAtomValue(userIdAtom);
    const cachedPlaylists = useAtomValue(cachedPlaylistsAtom);

    const profileQuery = useQuery(["users", userId], () => halyClient.users.getUser({ id: userId }));
    const topArtistsQuery = useQuery(["me", "top", "artists"], () => halyClient.me.getMyTopArtists());
    const followedArtistsQuery = useQuery(["me", "following"], () => halyClient.me.getMyFollowedArtists());
    const dominantColors = useAtomValue(dominantColorsAtom);

    if (!profileQuery.data) return <LoadingIndicator />;

    const { name, followersTotal, imageUrl } = profileQuery.data;
    const followsTotal = followedArtistsQuery.data?.length ?? 0;
    const createdPlaylists = cachedPlaylists.filter((p) => p.ownerId === userId).length;
    const dominantColor = dominantColors[imageUrl ?? ""];

    const followedArtistsCards: CardProps[] = (followedArtistsQuery.data ?? []).map((f) => {
        return {
            id: f.id,
            name: f.name,
            uri: `spotify:artist:${f.id}`,
            href: `/artist/${f.id}`,
            subtitle: "Profile",
            imageUrl: f.imageUrl,
        };
    });

    const topArtistsCards: CardProps[] = (topArtistsQuery.data ?? []).map((a) => {
        return {
            id: a.id,
            name: a.name,
            uri: `spotify:artist:${a.id}`,
            href: `/artist/${a.id}`,
            subtitle: capitalize(a.genres[0] ?? ""),
            imageUrl: a.imageUrl,
        };
    });

    return (
        <div>
            <PageHeader title={name} type="Profile" imageUrl={imageUrl} description={null}>
                {followersTotal > 0 && <span>{pluralize("Follower", followersTotal)}</span>}
                {followsTotal > 0 && <span>{pluralize("Followed Artist", followsTotal)}</span>}
                {createdPlaylists > 0 && <span>{pluralize("Owned Playlist", createdPlaylists)}</span>}
            </PageHeader>

            <PageControls />

            <ResizableCardGroup title="Top artists this month" items={topArtistsCards} maxRows={2} href="top/artists" />
            <ResizableCardGroup title="Followed Artists" items={followedArtistsCards} maxRows={1} href="following" />

            <PageGradient color={dominantColor} type="major" />
            <PageGradient color={dominantColor} type="minor" />
        </div>
    );
}

export default Me;
