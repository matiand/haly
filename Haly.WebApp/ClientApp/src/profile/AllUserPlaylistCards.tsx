import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

import halyClient from "../halyClient";
import { CardProps } from "../ui/card/Card";
import ResizableCardGroup from "../ui/card/ResizableCardGroup";

function AllUserPlaylistCards() {
    const { id } = useParams();

    const query = useQuery(["user", id!, "playlists"], () => halyClient.users.getPlaylists({ userId: id! }));

    if (!query.data) return null;
    const cards: CardProps[] = (query.data ?? []).map((p) => {
        return {
            id: p.id,
            name: p.name,
            uri: `spotify:playlist:${p.id}`,
            href: `/playlist/${p.id}`,
            imageUrl: p.imageUrl,
        };
    });

    return <ResizableCardGroup title="Public Playlists" items={cards} maxRows={Infinity} href="" />;
}

export default AllUserPlaylistCards;
