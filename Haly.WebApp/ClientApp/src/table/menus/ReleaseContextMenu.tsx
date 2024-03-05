import { ReleaseItemDto } from "../../../generated/haly";
import AlbumMenuItems from "../../album/menus/AlbumMenuItems";
import ContextMenu from "../../menus/ContextMenu";
import { AnchorPointMenuProps } from "../../menus/useContextMenu";

type ReleaseContextMenuProps = {
    release: ReleaseItemDto;
    menuProps: AnchorPointMenuProps;
};

function ReleaseContextMenu({ release, menuProps }: ReleaseContextMenuProps) {
    return (
        <ContextMenu menuProps={menuProps}>
            <AlbumMenuItems album={release} />
        </ContextMenu>
    );
}

export default ReleaseContextMenu;
