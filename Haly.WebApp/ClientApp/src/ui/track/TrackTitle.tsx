import React from "react";
import { Link } from "react-router-dom";

import { classNames, styled } from "../../common/theme";
import HighlightableText from "../../table/HighlightableText";

type TrackTitleProps = {
    name: string;
    href?: string;
    searchTerm?: string | null;
    onContextMenu?: (e: React.MouseEvent) => void;
};

function TrackTitle({ name, href, searchTerm, onContextMenu }: TrackTitleProps) {
    if (href) {
        return (
            <StyledTitle className={classNames.clampEllipsis} onContextMenu={onContextMenu}>
                <Link to={href}>
                    {/*// Don't highlight track name when it has a link.*/}
                    <span className={classNames.clampEllipsis}>{name}</span>
                </Link>
            </StyledTitle>
        );
    }

    return (
        <StyledTitle className={classNames.clampEllipsis} onContextMenu={onContextMenu}>
            <HighlightableText text={name} markedText={searchTerm} />
        </StyledTitle>
    );
}

export const StyledTitle = styled("div", {
    fontSize: "$350",
    gridArea: "title",
});

export default TrackTitle;
