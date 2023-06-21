import { HiSpeakerWave } from "react-icons/hi2";
import { NavLink } from "react-router-dom";

import { styled } from "../common/theme";

type UserLibraryLinkProps = {
    name: string;
    href: string;
};

function UserLibraryLink({ name, href }: UserLibraryLinkProps) {
    const isListenedTo = false;

    return (
        <Link to={href}>
            <span>{name}</span>

            <span>{isListenedTo && <Icon />}</span>
        </Link>
    );
}

const Link = styled(NavLink, {
    alignItems: "center",
    borderRadius: "4px",
    color: "$white",
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
    },

    "&:hover": {
        background: "$black500",
    },

    "&:active": {
        background: "$black800",
    },

    "&.active": {
        background: "$black450",

        "&:hover": {
            background: "$black300",
        },
    },
});

const Icon = styled(HiSpeakerWave, {
    color: "$primary",
    height: "14px",
    width: "14px",
});

export default UserLibraryLink;
