import { MenuDivider, MenuItem } from "@szhsin/react-menu";

import useIsAlbumInLibrary from "../../album/useIsAlbumInLibrary";
import { HeartMutationParams } from "../../common/useHeartMutations";
import ContextMenu from "../../menus/ContextMenu";
import AddToPlaylistMenuItem from "../../menus/items/AddToPlaylistMenuItem";
import AddToQueueMenuItem from "../../menus/items/AddToQueueMenuItem";
import HeartMenuItem from "../../menus/items/HeartMenuItem";
import ShareMenuItems from "../../menus/items/ShareMenuItems";
import { AnchorPointMenuProps } from "../../menus/useContextMenu";
import useIsPlaylistInLibrary from "../../playlist/useIsPlaylistInLibrary";
import useIsPlaylistOwnedByCurrentUser from "../../playlist/useIsPlaylistOwnedByCurrentUser";

type CardContextMenuProps = {
    id: string;
    name: string;
    uri: string;
    menuProps: AnchorPointMenuProps;
};

function CardContextMenu({ id, name, uri, menuProps }: CardContextMenuProps) {
    const type = getTypeFromUri(uri);

    return (
        <ContextMenu menuProps={menuProps}>
            {type === "playlist" ? (
                <PlaylistHeartMenuItemWrapper id={id} name={name} />
            ) : (
                <AlbumHeartMenuItemWrapper id={id} />
            )}

            {type === "album" && <AddToQueueMenuItem collectionUri={uri} />}
            <MenuDivider />
            <AddToPlaylistMenuItem collectionUri={uri} />
            <MenuDivider />
            <ShareMenuItems type={type} id={id} name={name} path={`/${type}/${id}`} />
        </ContextMenu>
    );
}

function PlaylistHeartMenuItemWrapper({ id, name }: { id: string; name: string }) {
    const isInLibrary = useIsPlaylistInLibrary(id);
    const isOwnedByCurrentUser = useIsPlaylistOwnedByCurrentUser(id);

    const params: HeartMutationParams = {
        id,
        type: "playlist",
    };

    return (
        <HeartMenuItem
            params={params}
            isInLibrary={isInLibrary}
            confirmationModalProps={{
                id,
                name,
                isOwnedByCurrentUser,
            }}
        />
    );
}

function AlbumHeartMenuItemWrapper({ id }: { id: string }) {
    const { isLoading: isLibraryStatusLoading, isOn } = useIsAlbumInLibrary(id);

    const params: HeartMutationParams = {
        id,
        type: "album",
    };

    return isLibraryStatusLoading ? (
        <MenuItem disabled>Add to Your Library</MenuItem>
    ) : (
        <HeartMenuItem params={params} isInLibrary={isOn} />
    );
}

function getTypeFromUri(uri: string) {
    return uri.split(":")[1] as "playlist" | "album";
}

export default CardContextMenu;
