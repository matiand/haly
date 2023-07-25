import { useQuery } from "@tanstack/react-query";

import { CardProps } from "../common/Card";
import ResizableCardGroup from "../common/ResizableCardGroup";
import halyClient from "../halyClient";

function AllMyTopArtistCards() {
    const query = useQuery(["me", "topArtists"], () => halyClient.me.getTopArtists());

    if (!query.data) return null;

    const cards: CardProps[] = (query.data ?? []).map((a) => {
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

    return <ResizableCardGroup title="Top artists this month" items={cards} maxRows={Infinity} href="" />;
}

export default AllMyTopArtistCards;
