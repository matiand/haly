import React from "react";
import { Link, useNavigate } from "react-router-dom";

import { classNames, styled } from "../../common/theme";
import HighlightableText from "../../table/HighlightableText";
import * as Block from "./Block";

type TrackTitleProps = {
    name: string;
    href?: string;
    searchTerm?: string | null;
    onContextMenu?: (e: React.MouseEvent) => void;
    useNavigateHook?: boolean;
};

function TrackTitle({ name, href, searchTerm, onContextMenu, useNavigateHook }: TrackTitleProps) {
    const navigate = useNavigate();

    if (href && useNavigateHook) {
        return (
            <StyledTitle className={classNames.clampEllipsis} onContextMenu={onContextMenu}>
                <div
                    role="button"
                    onClick={() => navigate(href)}
                    onKeyDown={(e) => e.key === "Enter" && navigate(href)}
                    tabIndex={0}
                >
                    {/*// Don't use the HighlightableText component when it is a link.*/}
                    <span className={classNames.clampEllipsis}>{name}</span>
                </div>
            </StyledTitle>
        );
    }

    if (href) {
        return (
            <StyledTitle className={classNames.clampEllipsis} onContextMenu={onContextMenu}>
                <Link to={href}>
                    {/*// Don't use the HighlightableText component when it is a link.*/}
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

const StyledTitle = styled(Block.Title, {
    "& > div[role=button]": {
        cursor: "pointer",
        display: "inline",
    },
});

export default TrackTitle;
