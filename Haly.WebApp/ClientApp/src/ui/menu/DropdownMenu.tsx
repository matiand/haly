import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { HiOutlineExternalLink } from "react-icons/hi";

import { styled } from "../../common/theme";

export const Root = DropdownMenu.Root;
export const Trigger = DropdownMenu.Trigger;
export const ItemBase = DropdownMenu.Item;

export const Content = styled(DropdownMenu.Content, {
    background: "$black200",
    borderRadius: "4px",
    fontSize: "$200",
    fontWeight: 500,
    marginTop: "$400",
    minWidth: "$userDropdownMinWidth",
    padding: "$200",
    userSelect: "none",
    zIndex: "$upperMenuContents",

    "& > *:not([role='separator'])": {
        padding: "$500",
    },

    "& > [role='menuitem']": {
        borderRadius: "2px",
        color: "$menuItemText",
        cursor: "default",

        "&:hover": {
            backgroundColor: "$trackHover",
            outline: 0,
        },
    },

    "& > a[role='menuitem']": {
        color: "unset",
        display: "flex",
        justifyContent: "space-between",
        textDecoration: "none",
    },
});

export function Item({ name, onClick }: { name: string; onClick: () => void }) {
    return (
        <DropdownMenu.Item onClick={onClick}>
            <div>{name}</div>
        </DropdownMenu.Item>
    );
}

export function ExternalLink({ name, href }: { name: string; href: string }) {
    return (
        <DropdownMenu.Item asChild>
            <a href={href} target="_blank" rel="noreferrer">
                {name}

                <span aria-hidden>
                    <ExternalLinkIcon />
                </span>
            </a>
        </DropdownMenu.Item>
    );
}

export const Separator = styled(DropdownMenu.Separator, {
    height: "1px",
    backgroundColor: "$black100",
});

const ExternalLinkIcon = styled(HiOutlineExternalLink, {
    height: "20px",
    width: "20px",
});

export default DropdownMenu;
