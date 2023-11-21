import { MenuDivider } from "@szhsin/react-menu";

import { AlbumBriefDto, AlbumDetailedDto } from "../../../generated/haly";
import { HeartMutationParams } from "../../common/useHeartMutations";
import AddToPlaylistMenuItem from "../../menus/items/AddToPlaylistMenuItem";
import AddToQueueMenuItem from "../../menus/items/AddToQueueMenuItem";
import HeartMenuItem from "../../menus/items/HeartMenuItem";
import ShareMenuItems from "../../menus/items/ShareMenuItems";
import useIsAlbumInLibrary from "../useIsAlbumInLibrary";

type AlbumMenuItemsProps = {
    album: AlbumBriefDto | AlbumDetailedDto;
};

function AlbumMenuItems({ album }: AlbumMenuItemsProps) {
    const { isLoading: isLibraryStatusLoading, isOn } = useIsAlbumInLibrary(album.id);
    const heartMutationParams: HeartMutationParams = {
        id: album.id,
        type: "album",
    };

    const albumUri = `spotify:album:${album.id}`;

    return (
        <>
            {!isLibraryStatusLoading && <HeartMenuItem params={heartMutationParams} isInLibrary={isOn} />}
            <AddToQueueMenuItem collectionUri={albumUri} />
            <MenuDivider />
            <AddToPlaylistMenuItem collectionUri={albumUri} />
            <MenuDivider />
            <ShareMenuItems type="album" id={album.id} name={album.name} path={`/album/${album.id}`} />
        </>
    );
}

export default AlbumMenuItems;
