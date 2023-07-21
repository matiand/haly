import { useQuery } from "@tanstack/react-query";

import { CardProps } from "../common/Card";
import CardCollection from "../common/CardCollection";
import halyClient from "../halyClient";
import AllCardsWrapper from "./AllCardsWrapper";

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

    return (
        <AllCardsWrapper>
            <CardCollection title="Top artists this month" items={cards} maxRows={Infinity} href="" />
        </AllCardsWrapper>
    );
}

export default AllMyTopArtistCards;
