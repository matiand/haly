import { Link, useNavigate } from "react-router-dom";

import { TrackDto } from "../../../generated/haly";
import { classNames, styled } from "../../common/theme";
import HighlightableText from "../../table/HighlightableText";

type TrackSubtitleProps = {
    artists: TrackDto["artists"];
    searchTerm?: string | null;
    useNavigateHook?: boolean;
};

function TrackSubtitle({ artists, searchTerm, useNavigateHook }: TrackSubtitleProps) {
    const navigate = useNavigate();

    return (
        <StyledSubtitle className={classNames.clampEllipsis}>
            {artists.map(({ name, id }) => {
                const href = `/artist/${id}`;

                if (useNavigateHook) {
                    return (
                        <div
                            key={id}
                            role="button"
                            onClick={() => navigate(href)}
                            onKeyDown={(e) => e.key === "Enter" && navigate(href)}
                            tabIndex={0}
                        >
                            <HighlightableText text={name} markedText={searchTerm} />
                        </div>
                    );
                }

                return (
                    // These links shouldn't be tabbable.
                    <Link key={id} to={href} tabIndex={-1}>
                        <HighlightableText text={name} markedText={searchTerm} />
                    </Link>
                );
            })}
        </StyledSubtitle>
    );
}

export const StyledSubtitle = styled("span", {
    gridArea: "subtitle",

    "& > a, & > div[role=button]": {
        color: "$white500",
        cursor: "pointer",
        display: "inline",
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
