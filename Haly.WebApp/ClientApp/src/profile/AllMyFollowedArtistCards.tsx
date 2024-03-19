import { useQuery } from "@tanstack/react-query";
import { useDocumentTitle } from "usehooks-ts";

import halyClient from "../halyClient";
import { CardProps } from "../ui/card/Card";
import ResizableCardGroup from "../ui/card/ResizableCardGroup";

function AllMyFollowedArtistCards() {
    useDocumentTitle("Me - Following");

    const query = useQuery(["me", "following"], () => halyClient.me.getMyFollowedArtists());

    if (!query.data) return null;

    const cards: CardProps[] = (query.data ?? []).map((f) => {
        return {
            id: f.id,
            name: f.name,
            uri: `spotify:artist:${f.id}`,
            href: `/artist/${f.id}`,
            subtitle: "Artist",
            imageUrl: f.imageUrl,
        };
    });

    return <ResizableCardGroup title="Followed Artists" items={cards} maxRows={Infinity} href="" />;
}

export default AllMyFollowedArtistCards;
