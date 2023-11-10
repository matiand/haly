import { MenuItem } from "@szhsin/react-menu";

import ContextMenu from "../menus/ContextMenu";
import { AnchorPointMenuProps } from "../menus/useContextMenu";

type UserLibraryContextMenuProps = {
    menuProps: AnchorPointMenuProps;
    createPlaylist: () => void;
};

function UserLibraryContextMenu({ menuProps, createPlaylist }: UserLibraryContextMenuProps) {
    return (
        <ContextMenu menuProps={menuProps}>
            <MenuItem onClick={() => createPlaylist()}>Create playlist</MenuItem>
        </ContextMenu>
    );
}

export default UserLibraryContextMenu;
