import { Link } from "react-router-dom";

import { TrackDto } from "../../../generated/haly";
import { classNames, styled } from "../../common/theme";
import HighlightableText from "../../table/HighlightableText";

type TrackSubtitleProps = {
    artists: TrackDto["artists"];
    searchTerm?: string | null;
};

function TrackSubtitle({ artists, searchTerm }: TrackSubtitleProps) {
    return (
        <StyledSubtitle className={classNames.clampEllipsis}>
            {artists.map(({ name, id }) => (
                // Disable tabbing on these links, cause the 'clampEllipsis' class breaks some focus styles.
                <Link key={id} to={`/artist/${id}`} tabIndex={-1}>
                    <HighlightableText text={name} markedText={searchTerm} />
                </Link>
            ))}
        </StyledSubtitle>
    );
}

export const StyledSubtitle = styled("span", {
    gridArea: "subtitle",

    "& > a": {
        color: "$white500",
        fontSize: "$200",
        textDecoration: "none",

        "&:hover": {
            color: "$white800",
            textDecoration: "underline",
        },

        "&:not(:last-child):after": {
            content: ",",

            // Inline-block removes the underline from this pseudo element.
            display: "inline-block",
            marginRight: "$100",
        },
    },
});

export default TrackSubtitle;
