import { useAtomValue } from "jotai";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

import { ReleaseItemDto } from "../../generated/haly";
import { artistNameAtom } from "../common/atoms";
import { styled } from "../common/theme";
import Card from "../ui/card/Card";
import * as CardGroup from "../ui/card/CardGroup";
import ResizableCardGroup from "../ui/card/ResizableCardGroup";
import RadioGroup from "../ui/RadioGroup";
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
        if (items.length === 0) return null;

        const byYear = groupByYear(originalData);

        return (
            <CardGroup.Root>
                <CardGroup.Title title={title} />
                <RadioGroup options={options} />

                {Object.entries(byYear)
                    .sort(([aYear], [bYear]) => +bYear - +aYear)
                    .map(([year, items]) => {
                        const cards = mapToCards(items);

                        return (
                            <YearGroup key={year}>
                                <h3>{year}</h3>
                                <CardGroup.Items>
                                    {cards.map((c) => (
                                        <Card key={c.id} {...c} />
                                    ))}
                                </CardGroup.Items>
                            </YearGroup>
                        );
                    })}
            </CardGroup.Root>
        );
    }

    return <ResizableCardGroup title={title} items={items} options={options} maxRows={Infinity} href="" />;
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

const mapToCards = (items: ReleaseItemDto[]) => {
    return items.map((i) => ({
        id: i.id,
        name: i.name,
        subtitle: i.type,
        imageUrl: i.imageUrl,
        href: `/album/${i.id}`,
        hasRoundedImage: false,
        isPlayable: true,
        isHighlighted: i.type === "Album",
    }));
};

const YearGroup = styled("div", {
    marginBottom: "$800",

    "& > h3": {
        padding: "$600 0",
    },
});

export default AllDiscographyCards;
