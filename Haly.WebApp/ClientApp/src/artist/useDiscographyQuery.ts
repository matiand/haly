import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

import { ArtistDiscographyDto, ReleaseItemDto } from "../../generated/haly";
import { CardProps } from "../common/Card";
import { Option } from "../common/RadioGroup";
import halyClient from "../halyClient";

export type DiscographyFilter = "all" | "album" | "single" | "compilation";

function useDiscographyQuery(artistId: string, initialFilter: DiscographyFilter = "all") {
    const query = useQuery(["artist", artistId, "discography"], () =>
        halyClient.artists.getArtistDiscography({ id: artistId! }),
    );
    const { filter, options } = useDiscographyFilter(initialFilter, query.data);

    let items: ReleaseItemDto[];
    if (filter === "album") {
        items = query.data?.albums ?? [];
    } else if (filter === "single") {
        items = query.data?.singlesAndEps ?? [];
    } else if (filter === "compilation") {
        items = query.data?.compilations ?? [];
    } else {
        items = query.data?.all ?? [];
    }

    return {
        originalData: items,
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
        filter,
    };
}

function useDiscographyFilter(initialFilter: DiscographyFilter, data?: ArtistDiscographyDto) {
    const [filter, setFilter] = useState<DiscographyFilter>(initialFilter);

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
            isDefault: filter === "all",
        },
    ];
    if (hasAlbums)
        options.push({
            name: "Albums",
            onSelected: () => {
                setFilter("album");
            },
            isDefault: filter === "album",
        });

    if (hasSinglesOrEps)
        options.push({
            name: "Singles and EPs",
            onSelected: () => {
                setFilter("single");
            },
            isDefault: filter === "single",
        });

    if (hasCompilations)
        options.push({
            name: "Compilations",
            onSelected: () => {
                setFilter("compilation");
            },
            isDefault: filter === "compilation",
        });

    return {
        filter,
        options: options.length > 2 ? options : [],
    };
}

export default useDiscographyQuery;
