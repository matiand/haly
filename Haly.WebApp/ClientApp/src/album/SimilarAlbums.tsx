import { useQuery } from "@tanstack/react-query";

import halyClient from "../halyClient";
import { CardProps } from "../ui/card/Card";
import ResizableCardGroup from "../ui/card/ResizableCardGroup";

type SimilarAlbumsProps = {
    albumId: string;
    trackIds: string[];
};

function SimilarAlbums({ albumId, trackIds }: SimilarAlbumsProps) {
    const query = useQuery({
        queryKey: ["recommendations", albumId],
        queryFn: () =>
            halyClient.albums.getAlbumRecomendations({
                id: albumId,
                trackIds: trackIds.slice(0, 5).join(","),
            }),
        staleTime: Infinity,
    });

    if (!query.data) return null;

    const cards: CardProps[] = query.data.map((album) => {
        const artists = album.artists.map((a) => a.name).join(", ");
        return {
            id: album.id,
            name: album.name,
            uri: `spotify:album:${album.id}`,
            href: `/album/${album.id}`,
            subtitle: [album.releaseYear, artists],
            imageUrl: album.imageUrl,
        };
    });

    return <ResizableCardGroup title="Similar Albums" items={cards} maxRows={1} />;
}

export default SimilarAlbums;
