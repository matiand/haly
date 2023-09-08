import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

import { styled } from "../../common/theme";

const MenuItemSeparator = styled(DropdownMenu.Separator, {
    height: "1px",
    backgroundColor: "$black100",
});

export default MenuItemSeparator;
