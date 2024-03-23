import { ReactNode } from "react";
import { Link } from "react-router-dom";

import { styled, theme } from "../../common/theme";

export const Root = styled("section", {
    padding: "$600 0",

    // CardGroup without RadioGroup
    "& > div + div:not([role=group])": {
        marginBlockStart: "-$400",
    },
});

type TitleProps = {
    title: string;
    href?: string | null;
};

export function Title({ title, href }: TitleProps) {
    if (!href) {
        return (
            <TitleWrapper>
                <h2>{title}</h2>
            </TitleWrapper>
        );
    }

    return (
        <TitleWrapper>
            <h2>
                <Link to={href}>{title}</Link>
            </h2>
            <Link to={href}>Show all</Link>
        </TitleWrapper>
    );
}

const TitleWrapper = styled("div", {
    display: "flex",
    justifyContent: "space-between",
    marginBlockEnd: "$600",
    userSelect: "none",

    "& > h2": {
        "& > a": {
            color: "inherit",
            fontSize: "inherit",
            fontWeight: "inherit",
            marginInlineStart: 0,
        },
    },

    "& a": {
        alignSelf: "end",
        background: "transparent",
        color: "$white600",
        cursor: "pointer",
        fontSize: "$300",
        fontWeight: 700,
        marginInlineStart: "$400",
        textDecoration: "none",

        "&:hover": {
            textDecoration: "underline",
        },
    },
});

type ItemsProps = {
    cardsPerRow: number;
    children: ReactNode;
};

export function Items({ cardsPerRow, children }: ItemsProps) {
    return <ItemsWrapper css={{ $$cardsPerRow: cardsPerRow }}>{children}</ItemsWrapper>;
}

const ItemsWrapper = styled("div", {
    $$gap: `${theme.cards.gap}px`,
    $$cardWidth: `${theme.cards.minWidth}px`,
    $$marginInlineStart: `${theme.cards.groupMarginInlineStart}px`,
    $$marginInlineEnd: `${theme.cards.groupMarginInlineEnd}px`,

    display: "grid",
    gridGap: "$$gap",
    gridTemplateColumns: "repeat($$cardsPerRow, minmax(0, 1fr))",
    marginInlineStart: "$$marginInlineStart",
    marginInlineEnd: "$$marginInlineEnd",
});
