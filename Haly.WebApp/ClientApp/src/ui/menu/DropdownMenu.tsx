import { Content, DropdownMenuContentProps } from "@radix-ui/react-dropdown-menu";
import React from "react";

import { styled } from "../../common/theme";

type DropdownMenuProps = {
    children: React.ReactNode;
    collisionPadding?: DropdownMenuContentProps["collisionPadding"];
};

function DropdownMenu({ children, collisionPadding }: DropdownMenuProps) {
    return <MenuContent collisionPadding={collisionPadding}>{children}</MenuContent>;
}

const MenuContent = styled(Content, {
    background: "$black200",
    borderRadius: "4px",
    fontSize: "$200",
    fontWeight: 500,
    marginTop: "$400",
    padding: "$200",
    userSelect: "none",
    width: "$userDropdownMinWidth",
    zIndex: "$upperMenuContents",

    "& > :first-child, & > [role='menuitem'] > div, a": {
        padding: "$500",
    },
});

export default DropdownMenu;
