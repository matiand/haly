import { useCallback, useRef, useState } from "react";
import { useResizeDetector } from "react-resize-detector";

import { theme } from "../../common/theme";
import RadioGroup, { Option } from "../RadioGroup";
import Card, { CardProps } from "./Card";
import * as CardGroup from "./CardGroup";

type ResizableCardGroupProps = {
    items: CardProps[];
    maxRows: number;
    title?: string;
    href?: string;
    options?: Option[];
};

function ResizableCardGroup({ title, items, maxRows, href, options }: ResizableCardGroupProps) {
    const [cardsPerRow, setCardsPerRow] = useState(8);
    const sectionRef = useRef<HTMLDivElement>(null);

    const onResize = useCallback((width?: number) => {
        if (!width) return;

        const { gap: cardGap, minWidth: cardMinWidth, groupMarginInlineStart, groupMarginInlineEnd } = theme.cards;

        const availableWidth = width - groupMarginInlineStart - groupMarginInlineEnd;
        const cardsPerRow = Math.floor((availableWidth + cardGap) / (cardMinWidth + cardGap));

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
            {title && <CardGroup.Title title={title} href={hasMore ? href : null} />}

            {hasOptions && <RadioGroup options={options} />}

            <CardGroup.Items cardsPerRow={cardsPerRow}>
                {items.slice(0, cardsPerRow * maxRows).map((card) => (
                    <Card key={card.id} {...card} />
                ))}
            </CardGroup.Items>
        </CardGroup.Root>
    );
}

export default ResizableCardGroup;
