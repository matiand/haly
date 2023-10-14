import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

import { ArtistAppearancesDto, ReleaseItemDto } from "../../generated/haly";
import { capitalize } from "../common/capitalize";
import halyClient from "../halyClient";
import { CardProps } from "../ui/card/Card";
import { Option } from "../ui/RadioGroup";

export type AppearsOnFilter = "album" | "single" | "compilation";

function useAppearsOnQuery(artistId: string, initialFilter: AppearsOnFilter = "album") {
    const query = useQuery(["artist", artistId, "appearances"], () =>
        halyClient.artists.getArtistAppearances({ id: artistId! }),
    );
    const { filter, options } = useAppearsOnFilter(initialFilter, query.data);

    let items: ReleaseItemDto[];
    if (filter === "album") {
        items = query.data?.albums ?? [];
    } else if (filter === "single") {
        items = query.data?.singlesAndEps ?? [];
    } else {
        items = query.data?.compilations ?? [];
    }

    return {
        items: items.map<CardProps>((i) => ({
            id: i.id,
            name: i.name,
            imageUrl: i.imageUrl,
            href: `/album/${i.id}`,
            hasRoundedImage: false,
            contextUri: `spotify:album:${i.id}`,
            subtitle: [i.releaseYear, capitalize(i.type)],
        })),
        options,
        filter,
    };
}

function useAppearsOnFilter(initialFilter: AppearsOnFilter, data?: ArtistAppearancesDto) {
    const [filter, setFilter] = useState<AppearsOnFilter>(initialFilter);

    if (!data)
        return {
            filter,
            options: [],
        };

    const hasAlbums = data.albums.length > 0;
    const hasSinglesOrEps = data.singlesAndEps.length > 0;
    const hasCompilations = data.compilations.length > 0;

    const options: Option[] = [];
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
        options: options.length > 1 ? options : [],
    };
}

export default useAppearsOnQuery;
