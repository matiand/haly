import { useCallback, useRef, useState } from "react";
import { useResizeDetector } from "react-resize-detector";
import { Link } from "react-router-dom";

import { PlaylistCardDto } from "../../generated/haly";
import Card from "./Card";
import { styled } from "./theme";

type CardCollectionProps = {
    title: string;
    items: PlaylistCardDto[];
    maxRows: number;
};

const cardGap = 24;
const minCardWidth = 190;

function CardCollection({ title, items, maxRows }: CardCollectionProps) {
    const [cardsPerRow, setCardsPerRow] = useState(8);
    const sectionRef = useRef<HTMLDivElement>(null);

    const onResize = useCallback((width?: number) => {
        if (!width) return;

        const cardsPerRow = Math.floor((width + cardGap) / (minCardWidth + cardGap));
        setCardsPerRow(cardsPerRow);
    }, []);

    useResizeDetector({ targetRef: sectionRef, onResize });

    const hasMore = items.length > cardsPerRow * maxRows;

    return (
        <Section ref={sectionRef}>
            <div>
                <h2>{hasMore ? <Link to="playlists">{title}</Link> : title}</h2>
                {hasMore && <Link to="playlists">Show all</Link>}
            </div>

            <Grid>
                {items.slice(0, cardsPerRow * maxRows).map((card) => (
                    <Card key={card.id} {...card} href={`/playlist/${card.id}`} />
                ))}
            </Grid>
        </Section>
    );
}

const Section = styled("section", {
    padding: "$700 0",

    "& > :first-child": {
        display: "flex",
        justifyContent: "space-between",
        marginBottom: "$700",

        "& > h2": {
            fontSize: "$500",
            fontWeight: 800,
            lineHeight: 1,

            "& > a": {
                color: "inherit",
                fontSize: "inherit",
                fontWeight: "inherit",
                marginLeft: 0,
            },
        },

        "& a": {
            background: "transparent",
            color: "$white600",
            cursor: "pointer",
            fontSize: "$300",
            fontWeight: 700,
            marginLeft: "$400",
            textDecoration: "none",
            userSelect: "none",

            "&:hover": {
                textDecoration: "underline",
            },
        },
    },
});

const Grid = styled("div", {
    $$gap: `${cardGap}px`,
    $$cardWidth: `${minCardWidth}px`,

    display: "grid",
    gridGap: "$$gap",
    gridTemplateColumns: `repeat(auto-fit, minmax($$cardWidth, 1fr))`,
});

export default CardCollection;