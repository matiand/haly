import { useQuery } from "@tanstack/react-query";

import { CardProps } from "../common/Card";
import ResizableCardGroup from "../common/ResizableCardGroup";
import halyClient from "../halyClient";

function AllMyFollowedArtistCards() {
    const query = useQuery(["me", "following"], () => halyClient.me.getFollowedArtists());

    if (!query.data) return null;

    const cards: CardProps[] = (query.data ?? []).map((f) => {
        return {
            id: f.id,
            name: f.name,
            subtitle: "Artist",
            imageUrl: f.imageUrl,
            href: `/artist/${f.id}`,
            hasRoundedImage: true,
            isPlayable: false,
        };
    });

    return <ResizableCardGroup title="Followed Artists" items={cards} maxRows={Infinity} href="" />;
}

export default AllMyFollowedArtistCards;
