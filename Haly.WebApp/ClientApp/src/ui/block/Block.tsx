import { classNames, styled } from "../../common/theme";

export const Root = styled("div", {
    alignItems: "center",
    display: "flex",
    gap: "$500",

    [`& .${classNames.clampEllipsis} span`]: {
        display: "inline",
    },
});

export const Title = styled("div", {
    fontSize: "$350",
    gridArea: "title",
});

export const Subtitle = styled("span", {
    fontSize: "$200",
    gridArea: "subtitle",
});

export const Grid = styled("div", {
    variants: {
        type: {
            playback: {
                lineHeight: 1.4,

                [`& ${Title} > a, & ${Title} > div[role=button]`]: {
                    color: "inherit",
                    fontSize: "$300",
                    textDecoration: "none",

                    "&:hover": {
                        textDecoration: "underline",
                    },
                },

                [`& ${Subtitle} > a, & ${Subtitle} > div[role=button]`]: {
                    fontSize: "$100",
                },
            },
            default: {
                fontSize: "$300",
                paddingRight: "$400",
            },
        },
    },

    alignItems: "center",
    color: "$white800",
    display: "grid",
    fontWeight: "500",
    gridTemplateAreas: `"title title"
                        "mark subtitle"`,
    gridTemplateColumns: "auto 1fr",
    userSelect: "none",
});

export const Mark = styled("span", {
    gridArea: "mark",

    background: "$blockMarkBg",
    borderRadius: "2px",
    color: "$black600",
    fontSize: "8px",
    fontWeight: 800,
    lineHeight: 1,
    marginRight: "$400",
    marginTop: "$100",
    padding: "$200",
});
