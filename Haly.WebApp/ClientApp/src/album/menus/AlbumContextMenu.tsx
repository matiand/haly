import { AlbumBriefDto, AlbumDetailedDto } from "../../../generated/haly";
import ContextMenu from "../../menus/ContextMenu";
import { AnchorPointMenuProps } from "../../menus/useContextMenu";
import AlbumMenuItems from "./AlbumMenuItems";

type AlbumContextMenuProps = {
    album: AlbumBriefDto | AlbumDetailedDto;
    menuProps: AnchorPointMenuProps;
};

function AlbumContextMenu({ album, menuProps }: AlbumContextMenuProps) {
    return (
        <ContextMenu menuProps={menuProps}>
            <AlbumMenuItems album={album} />
        </ContextMenu>
    );
}

export default AlbumContextMenu;
