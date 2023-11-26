import { MenuItem } from "@szhsin/react-menu";

import useRemoveFromPlaylistMutation, {
    RemoveFromPlaylistMutationParams,
} from "../../playlist/useRemoveFromPlaylistMutation";

type RemoveFromPlaylistMenuItemProps = {
    params: RemoveFromPlaylistMutationParams;
};

function RemoveFromPlaylistMenuItem({ params }: RemoveFromPlaylistMenuItemProps) {
    const removeFromPlaylist = useRemoveFromPlaylistMutation();

    return <MenuItem onClick={() => removeFromPlaylist.mutate(params)}>Remove from this playlist</MenuItem>;
}

export default RemoveFromPlaylistMenuItem;
