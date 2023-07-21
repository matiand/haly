import { useAtomValue } from "jotai";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

import { AlbumTrackDto, ReleaseItemDto } from "../../generated/haly";
import { artistNameAtom } from "../common/atoms";
import CardCollection from "../common/CardCollection";
import { styled } from "../common/theme";
import AllCardsWrapper from "../profile/AllCardsWrapper";
import useDiscographyQuery, { DiscographyFilter } from "./useDiscographyQuery";

function AllDiscographyCards() {
    const { id: artistId, filter: pathFilter } = useParams();
    const { originalData, items, options, filter } = useDiscographyQuery(artistId!, pathFilter as DiscographyFilter);
    const artistName = useAtomValue(artistNameAtom);

    const title = artistName ?? "Discography";

    useEffect(() => {
        const currentHref = window.location.href;
        const currentFilter = currentHref.split("/").at(-1);
        const newHref = currentHref.replace(currentFilter!, filter);

        window.history.replaceState(null, "", newHref);
    }, [filter, pathFilter]);

    if (filter === "all") {
        const byYear = groupByYear(originalData);

        console.log(byYear);

        return <AllCardsWrapper>FOOOOOOOOOOOOOOO</AllCardsWrapper>;
    }

    return (
        <AllCardsWrapper>
            <CardCollection title={title} items={items} options={options} maxRows={Infinity} href="" />
        </AllCardsWrapper>
    );
}

const groupByYear = (items: ReleaseItemDto[]) => {
    return items.reduce<Record<number, ReleaseItemDto[]>>((groups, item) => {
        const key = item.releaseYear;

        if (!groups[key]) {
            groups[key] = [];
        }
        groups[key].push(item);

        return groups;
    }, {});
};

export default AllDiscographyCards;
