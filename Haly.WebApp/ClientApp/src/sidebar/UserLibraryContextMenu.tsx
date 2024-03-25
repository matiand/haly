import { MenuDivider, MenuItem, SubMenu } from "@szhsin/react-menu";
import { useSetAtom } from "jotai/index";

import { persistedSidebarWidthAtom } from "../common/atoms/pageAtoms";
import { theme } from "../common/theme";
import ContextMenu from "../menus/ContextMenu";
import { AnchorPointMenuProps } from "../menus/useContextMenu";

type UserLibraryContextMenuProps = {
    menuProps: AnchorPointMenuProps;
    createPlaylist: () => void;
};

function UserLibraryContextMenu({ menuProps, createPlaylist }: UserLibraryContextMenuProps) {
    const setSidebarWidth = useSetAtom(persistedSidebarWidthAtom);

    return (
        <ContextMenu menuProps={menuProps}>
            <MenuItem onClick={() => createPlaylist()}>Create playlist</MenuItem>

            <MenuDivider />
            <SubMenu label="Sidebar size">
                <MenuItem onClick={() => setSidebarWidth(theme.sidebar.minWidth)}>Small</MenuItem>
                <MenuItem onClick={() => setSidebarWidth(theme.sidebar.defaultWidth)}>Medium</MenuItem>
                <MenuItem onClick={() => setSidebarWidth(theme.sidebar.maxWidth)}>Large</MenuItem>
            </SubMenu>
        </ContextMenu>
    );
}

export default UserLibraryContextMenu;
