import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

import { ArtistAppearancesDto, ReleaseItemDto } from "../../generated/haly";
import { CardProps } from "../common/Card";
import { Option } from "../common/RadioGroup";
import halyClient from "../halyClient";

type AppearsOnFilter = "albums" | "singlesAndEps" | "compilations";

function useAppearsOnQuery(artistId: string) {
    const query = useQuery(["artist", artistId, "appearances"], () =>
        halyClient.artists.getArtistAppearances({ id: artistId! }),
    );
    const { filter, options } = useAppearsOnFilter(query.data);

    let items: ReleaseItemDto[];
    if (filter === "albums") {
        items = query.data?.albums ?? [];
    } else if (filter === "singlesAndEps") {
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
            isPlayable: true,
            subtitle: [i.releaseYear, i.type],
        })),
        options,
    };
}

function useAppearsOnFilter(data?: ArtistAppearancesDto) {
    const [filter, setFilter] = useState<AppearsOnFilter>("albums");

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

export default useAppearsOnQuery;
