import clsx from "clsx";
import { HiSpeakerWave } from "react-icons/hi2";
import { NavLink } from "react-router-dom";

import { styled } from "../common/theme";
import { ContextPlaybackState } from "../playback/useContextPlaybackState";

type UserLibraryLinkProps = {
    name: string;
    href: string;
    playbackState: ContextPlaybackState;
};

function UserLibraryLink({ name, href, playbackState }: UserLibraryLinkProps) {
    const isListenedTo = playbackState !== "none";

    return (
        <Link to={href}>
            <span className={clsx({ isListenedTo })}>{name}</span>

            <span aria-hidden>{playbackState === "playing" && <Icon />}</span>
        </Link>
    );
}

const Link = styled(NavLink, {
    alignItems: "center",
    borderRadius: "4px",
    color: "$white800",
    display: "flex",
    gap: "$600",
    justifyContent: "space-between",
    padding: "$200 $400",
    textDecoration: "none",

    "span:first-of-type": {
        fontSize: "$300",
        fontWeight: 500,
        overflow: "hidden",
        whiteSpace: "nowrap",
        textOverflow: "ellipsis",

        "&.isListenedTo": {
            color: "$primary400",
        },
    },

    "&:hover": {
        background: "$black500",
    },

    "&:active": {
        background: "$black800",
    },

    "&.active": {
        background: "$black300",

        "&:hover": {
            background: "$black100",
        },
    },
});

const Icon = styled(HiSpeakerWave, {
    color: "$primary400",
    height: "14px",
    width: "14px",
});

export default UserLibraryLink;
