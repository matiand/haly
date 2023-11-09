import { useAtomValue } from "jotai";

import { PlaylistWithTracksDto } from "../../../generated/haly";
import { userIdAtom } from "../../common/atoms";
import ContextMenu from "../../menus/ContextMenu";
import { AnchorPointMenuProps } from "../../menus/useContextMenu";
import useIsPlaylistInLibrary from "../useIsPlaylistInLibrary";
import PlaylistMenuItems from "./PlaylistMenuItems";

type PlaylistContextMenuProps = {
    playlist: PlaylistWithTracksDto;
    menuProps: AnchorPointMenuProps;
};

function PlaylistContextMenu({ playlist, menuProps }: PlaylistContextMenuProps) {
    const userId = useAtomValue(userIdAtom);
    const isInLibrary = useIsPlaylistInLibrary(playlist.id);

    const isOwnedByCurrentUser = playlist.owner.id === userId;

    return (
        <ContextMenu menuProps={menuProps}>
            <PlaylistMenuItems
                playlist={playlist}
                isInLibrary={isInLibrary}
                isOwnedByCurrentUser={isOwnedByCurrentUser}
            />
        </ContextMenu>
    );
}

export default PlaylistContextMenu;
