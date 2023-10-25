import { MenuDivider, MenuItem, SubMenu } from "@szhsin/react-menu";

import { AlbumDetailedDto } from "../../generated/haly";
import AddToPlaylistMenuItem from "../contextmenu/AddToPlaylistMenuItem";
import AddToQueueMenuItem from "../contextmenu/AddToQueueMenuItem";
import FollowMenuItem from "../contextmenu/FollowMenuItem";
import MoreOptions, { ContextMenu } from "../contextmenu/MoreOptions";
import ShareMenuSection from "../contextmenu/ShareMenuSection";

type MoreOptionsAlbumProps = {
    album: AlbumDetailedDto;
};

function MoreOptionsAlbum({ album }: MoreOptionsAlbumProps) {
    const label = `More options for album '${album.name}'`;

    return (
        <MoreOptions label={label}>
            <FollowMenuItem />
            <AddToQueueMenuItem />
            <MenuDivider />

            <AddToPlaylistMenuItem />

            <MenuDivider />
            {/*<ShareMenuSection type="album" id={album.id} name={album.name} path={`/album/${album.id}`} />*/}
        </MoreOptions>
    );
}

export default MoreOptionsAlbum;
