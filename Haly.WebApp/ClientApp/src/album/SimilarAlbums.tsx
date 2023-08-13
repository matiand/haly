import { useQuery } from "@tanstack/react-query";

import { CardProps } from "../common/Card";
import ResizableCardGroup from "../common/ResizableCardGroup";
import halyClient from "../halyClient";

type SimilarAlbumsProps = {
    albumId: string;
    trackIds: string[];
};

function SimilarAlbums({ albumId, trackIds }: SimilarAlbumsProps) {
    const query = useQuery(
        ["recommendations", albumId],
        () =>
            halyClient.albums.getAlbumRecomendations({
                id: albumId,
                trackIds: trackIds.slice(0, 5).join(","),
            }),
        { staleTime: Infinity },
    );

    if (!query.data) return null;

    const cards: CardProps[] = query.data.map((album) => {
        const artists = album.artists.map((a) => a.name).join(", ");
        return {
            id: album.id,
            name: album.name,
            href: `/album/${album.id}`,
            subtitle: [album.releaseYear, artists],
            imageUrl: album.imageUrl,
            isPlayable: false,
            hasRoundedImage: false,
        };
    });

    return <ResizableCardGroup title="Similar Albums" items={cards} maxRows={1} />;
}

export default SimilarAlbums;
