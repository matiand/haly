import { Link } from "react-router-dom";

import { styled, theme } from "../../common/theme";

export const Root = styled("section", {
    padding: "$700 0",
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
    marginBottom: "$700",
    userSelect: "none",

    "& > h2": {
        "& > a": {
            color: "inherit",
            fontSize: "inherit",
            fontWeight: "inherit",
            marginLeft: 0,
        },
    },

    "& a": {
        alignSelf: "end",
        background: "transparent",
        color: "$white600",
        cursor: "pointer",
        fontSize: "$300",
        fontWeight: 700,
        marginLeft: "$400",
        textDecoration: "none",

        "&:hover": {
            textDecoration: "underline",
        },
    },
});

export const Items = styled("div", {
    $$gap: `${theme.cards.gap}px`,
    $$cardWidth: `${theme.cards.minWidth}px`,

    display: "grid",
    gridGap: "$$gap",
    gridTemplateColumns: `repeat(auto-fill, minmax($$cardWidth, 1fr))`,
});
