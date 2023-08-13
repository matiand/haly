import { useCallback, useRef, useState } from "react";
import { useResizeDetector } from "react-resize-detector";

import Card, { CardProps } from "./Card";
import * as CardGroup from "./CardGroup";
import RadioGroup, { Option } from "./RadioGroup";
import { theme } from "./theme";

type ResizableCardGroupProps = {
    title: string;
    items: CardProps[];
    maxRows: number;
    href?: string;
    options?: Option[];
};

function ResizableCardGroup({ title, items, maxRows, href, options }: ResizableCardGroupProps) {
    const [cardsPerRow, setCardsPerRow] = useState(8);
    const sectionRef = useRef<HTMLDivElement>(null);

    const onResize = useCallback((width?: number) => {
        if (!width) return;

        const { gap: cardGap, minWidth: cardMinWidth } = theme.cards;

        const cardsPerRow = Math.floor((width + cardGap) / (cardMinWidth + cardGap));
        setCardsPerRow(cardsPerRow);
    }, []);

    useResizeDetector({
        targetRef: sectionRef,
        onResize,
    });

    const hasMore = items.length > cardsPerRow * maxRows && href;
    const hasOptions = options && options.length > 0;

    if (items.length === 0) return null;

    return (
        <CardGroup.Root ref={sectionRef}>
            <CardGroup.Title title={title} href={hasMore ? href : null} />

            {hasOptions && <RadioGroup options={options} />}

            <CardGroup.Items>
                {items.slice(0, cardsPerRow * maxRows).map((card) => (
                    <Card key={card.id} {...card} />
                ))}
            </CardGroup.Items>
        </CardGroup.Root>
    );
}

export default ResizableCardGroup;
