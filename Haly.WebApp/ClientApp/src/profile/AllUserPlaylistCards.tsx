import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

import { CardProps } from "../common/Card";
import ResizableCardGroup from "../common/ResizableCardGroup";
import halyClient from "../halyClient";

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

    return <ResizableCardGroup title="Public Playlists" items={cards} maxRows={Infinity} href="" />;
}

export default AllUserPlaylistCards;
