import { PlaylistBriefDto, PlaylistWithTracksDto } from "../../../generated/haly";
import ContextMenu from "../../menus/ContextMenu";
import { AnchorPointMenuProps } from "../../menus/useContextMenu";
import useIsPlaylistInLibrary from "../useIsPlaylistInLibrary";
import useIsPlaylistOwnedByCurrentUser from "../useIsPlaylistOwnedByCurrentUser";
import PlaylistMenuItems from "./PlaylistMenuItems";

type PlaylistContextMenuProps = {
    playlist: PlaylistBriefDto | PlaylistWithTracksDto;
    menuProps: AnchorPointMenuProps;
    isLikedSongsCollection: boolean;
};

function PlaylistContextMenu({ playlist, menuProps, isLikedSongsCollection }: PlaylistContextMenuProps) {
    const isInLibrary = useIsPlaylistInLibrary(playlist.id);

    const ownerId = "ownerId" in playlist ? playlist.ownerId : playlist.owner.id;
    const isOwnedByCurrentUser = useIsPlaylistOwnedByCurrentUser(ownerId);

    return (
        <ContextMenu menuProps={menuProps}>
            <PlaylistMenuItems
                playlist={playlist}
                isInLibrary={isInLibrary}
                isOwnedByCurrentUser={isOwnedByCurrentUser}
                isLikedSongsCollection={isLikedSongsCollection}
            />
        </ContextMenu>
    );
}

export default PlaylistContextMenu;
