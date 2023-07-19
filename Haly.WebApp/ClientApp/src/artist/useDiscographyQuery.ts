import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

import { ArtistDiscographyDto, ReleaseItemDto } from "../../generated/haly";
import { CardProps } from "../common/Card";
import { Option } from "../common/RadioGroup";
import halyClient from "../halyClient";

function useDiscographyQuery(artistId: string) {
    const query = useQuery(["artist", artistId, "discography"], () =>
        halyClient.artists.getArtistDiscography({ id: artistId! }),
    );
    const { filter, options } = useDiscographyFilter(query.data);

    let items: ReleaseItemDto[];
    if (filter === "albums") {
        items = query.data?.albums ?? [];
    } else if (filter === "singlesAndEps") {
        items = query.data?.singlesAndEps ?? [];
    } else if (filter === "compilations") {
        items = query.data?.compilations ?? [];
    } else {
        items = query.data?.all ?? [];
    }

    return {
        items: items
            .sort((a, b) => b.releaseYear - a.releaseYear)
            .map<CardProps>((i) => ({
                id: i.id,
                name: i.name,
                imageUrl: i.imageUrl,
                href: `/album/${i.id}`,
                hasRoundedImage: false,
                isPlayable: true,
                subtitle: [i.releaseYear, i.type],
            })),
        options,
    };
}

function useDiscographyFilter(data?: ArtistDiscographyDto) {
    type DiscographyFilter = "all" | "albums" | "singlesAndEps" | "compilations";
    const [filter, setFilter] = useState<DiscographyFilter>("all");

    if (!data)
        return {
            filter,
            options: [],
        };

    const hasAlbums = data.albums.length > 0;
    const hasSinglesOrEps = data.singlesAndEps.length > 0;
    const hasCompilations = data.compilations.length > 0;

    const options: Option[] = [
        {
            name: "All releases",
            onSelected: () => {
                setFilter("all");
            },
        },
    ];
    if (hasAlbums)
        options.push({
            name: "Albums",
            onSelected: () => {
                setFilter("albums");
            },
        });

    if (hasSinglesOrEps)
        options.push({
            name: "Singles and EPs",
            onSelected: () => {
                setFilter("singlesAndEps");
            },
        });

    if (hasCompilations)
        options.push({
            name: "Compilations",
            onSelected: () => {
                setFilter("compilations");
            },
        });

    return {
        filter,
        options,
    };
}

export default useDiscographyQuery;
