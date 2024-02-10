import { classNames, styled } from "../../common/theme";
import { StyledSubtitle } from "./TrackSubtitle";
import { StyledTitle } from "./TrackTitle";

export const Root = styled("div", {
    alignItems: "center",
    display: "flex",

    "& > *:first-child": {
        marginRight: "$600",
    },

    [`& .${classNames.clampEllipsis} span`]: {
        display: "inline",
    },
});

export const Grid = styled("div", {
    variants: {
        type: {
            playback: {
                lineHeight: 1.4,

                [`& ${StyledTitle} > a, & ${StyledTitle} > div[role=button]`]: {
                    color: "inherit",
                    fontSize: "$300",
                    textDecoration: "none",

                    "&:hover": {
                        textDecoration: "underline",
                    },
                },

                [`& ${StyledSubtitle} > a, & ${StyledSubtitle} > div[role=button]`]: {
                    fontSize: "$100",
                },
            },
            cell: {
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
                        "explicit subtitle"`,
    gridTemplateColumns: "auto 1fr",
    userSelect: "none",
});

export function ExplicitMark() {
    return (
        <ExplicitMarkWrapper aria-label="Explicit" title="Explicit">
            E
        </ExplicitMarkWrapper>
    );
}

export const ExplicitMarkWrapper = styled("span", {
    background: "$explicitMarkBg",
    borderRadius: "2px",
    color: "$black600",
    fontSize: "8px",
    fontWeight: 800,
    gridArea: "explicit",
    lineHeight: 1,
    marginRight: "$400",
    marginTop: "$100",
    padding: "$200",
});
