import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { HiOutlineExternalLink } from "react-icons/hi";

import { styled } from "../../common/theme";

type MenuItemProps = {
    name: string;
    onClick?: () => void;
    externalHref?: string;
};

function MenuItem({ name, onClick, externalHref }: MenuItemProps) {
    if (externalHref) {
        return (
            // We need to use the asChild prop, otherwise pressing enter on them won't do anything.
            <ExternalItem asChild={true}>
                <a href={externalHref} target="_blank" rel="noreferrer">
                    {name}

                    <span aria-hidden>
                        <ExternalLinkIcon />
                    </span>
                </a>
            </ExternalItem>
        );
    }

    return (
        <Item onClick={onClick}>
            <div>{name}</div>
        </Item>
    );
}

const Item = styled(DropdownMenu.Item, {
    borderRadius: "2px",
    color: "$userDropdownItemText",
    cursor: "default",

    "&:hover": {
        backgroundColor: "$trackHover",
        outline: 0,
    },
});

const ExternalItem = styled(Item, {
    color: "unset",
    display: "flex",
    justifyContent: "space-between",
    textDecoration: "none",
});

const ExternalLinkIcon = styled(HiOutlineExternalLink, {
    height: "20px",
    width: "20px",
});

export default MenuItem;
