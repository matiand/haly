import { useQuery } from "@tanstack/react-query";

import { capitalize } from "../common/capitalize";
import halyClient from "../halyClient";
import { CardProps } from "../ui/card/Card";
import ResizableCardGroup from "../ui/card/ResizableCardGroup";

function AllMyTopArtistCards() {
    const query = useQuery(["me", "topArtists"], () => halyClient.me.getMyTopArtists());

    if (!query.data) return null;

    const cards: CardProps[] = (query.data ?? []).map((a) => {
        return {
            id: a.id,
            name: a.name,
            uri: `spotify:artist:${a.id}`,
            href: `/artist/${a.id}`,
            subtitle: capitalize(a.genres[0] ?? ""),
            imageUrl: a.imageUrl,
        };
    });

    return <ResizableCardGroup title="Top artists this month" items={cards} maxRows={Infinity} href="" />;
}

export default AllMyTopArtistCards;
