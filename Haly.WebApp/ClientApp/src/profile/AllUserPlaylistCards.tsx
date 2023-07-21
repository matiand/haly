import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

import { CardProps } from "../common/Card";
import CardCollection from "../common/CardCollection";
import halyClient from "../halyClient";
import AllCardsWrapper from "./AllCardsWrapper";

function AllUserPlaylistCards() {
    const { id } = useParams();

    const query = useQuery(["user", id!, "playlists"], () => halyClient.users.getPlaylists({ userId: id! }));

    if (!query.data) return null;
    const cards: CardProps[] = (query.data ?? []).map((p) => {
        return {
            id: p.id,
            name: p.name,
            imageUrl: p.imageUrl,
            href: `/playlist/${p.id}`,
            hasRoundedImage: false,
            isPlayable: true,
        };
    });

    return (
        <AllCardsWrapper>
            <CardCollection title="Public Playlists" items={cards} maxRows={Infinity} href="" />
        </AllCardsWrapper>
    );
}

export default AllUserPlaylistCards;
