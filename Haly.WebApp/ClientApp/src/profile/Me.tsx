import { useQuery } from "@tanstack/react-query";
import { useAtomValue } from "jotai";

import { dominantColorsAtom, userAtom } from "../common/atoms";
import { CardProps } from "../common/Card";
import LoadingIndicator from "../common/LoadingIndicator";
import PageControls from "../common/PageControls";
import PageHeader from "../common/PageHeader";
import { pluralize } from "../common/pluralize";
import ResizableCardGroup from "../common/ResizableCardGroup";
import halyClient from "../halyClient";
import PlaylistGradient from "../playlist/PlaylistGradient";

function Me() {
    const user = useAtomValue(userAtom)!;

    const profileQuery = useQuery(["users", user.id], () => halyClient.users.getUser({ id: user.id }));
    const topArtistsQuery = useQuery(["me", "top", "artists"], () => halyClient.me.getTopArtists());
    const followedArtistsQuery = useQuery(["me", "following"], () => halyClient.me.getFollowedArtists());
    const dominantColors = useAtomValue(dominantColorsAtom);

    if (!profileQuery.data) return <LoadingIndicator />;

    const { name, followersTotal, imageUrl } = profileQuery.data;
    const followsTotal = followedArtistsQuery.data?.length ?? 0;
    const dominantColor = dominantColors[imageUrl ?? ""];

    const followsCards: CardProps[] = (followedArtistsQuery.data ?? []).map((f) => {
        return {
            id: f.id,
            name: f.name,
            subtitle: "Profile",
            imageUrl: f.imageUrl,
            href: `/artist/${f.id}`,
            hasRoundedImage: true,
            isPlayable: false,
        };
    });

    const topArtistsCards: CardProps[] = (topArtistsQuery.data ?? []).map((a) => {
        return {
            id: a.id,
            name: a.name,
            subtitle: a.genres[0],
            imageUrl: a.imageUrl,
            href: `/artist/${a.id}`,
            hasRoundedImage: true,
            isPlayable: true,
        };
    });

    return (
        <div>
            <PageHeader title={name} type="Profile" imageUrl={imageUrl} description={null}>
                {followersTotal > 0 && <span>{pluralize("Follower", followersTotal)}</span>}
                {followsTotal > 0 && <span>{pluralize("Followed Artist", followsTotal)}</span>}
            </PageHeader>

            <PageControls />

            <ResizableCardGroup title="Top artists this month" items={topArtistsCards} maxRows={2} href="top/artists" />
            <ResizableCardGroup title="Followed Artists" items={followsCards} maxRows={1} href="following" />

            <PlaylistGradient color={dominantColor} type="major" />
            <PlaylistGradient color={dominantColor} type="minor" />
        </div>
    );
}

export default Me;