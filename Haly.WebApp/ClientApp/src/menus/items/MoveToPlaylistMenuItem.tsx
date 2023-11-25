import { FocusableItem, MenuGroup, MenuItem, SubMenu } from "@szhsin/react-menu";
import { useAtomValue } from "jotai/index";
import { useState } from "react";

import { RemoveTracksRequest } from "../../../generated/haly";
import { cachedPlaylistsAtom } from "../../common/atoms/playlistAtoms";
import { userIdAtom } from "../../common/atoms/userAtoms";
import { styled } from "../../common/theme";
import useMoveToPlaylistMutation from "../../playlist/useMoveToPlaylistMutation";
import { ScrollArea } from "../../ui/ScrollArea";

type MoveToPlaylistMenuItemProps = {
    fromPlaylistId: string;
    tracks: RemoveTracksRequest["tracks"];
};

function MoveToPlaylistMenuItem({ fromPlaylistId, tracks }: MoveToPlaylistMenuItemProps) {
    const [filter, setFilter] = useState("");
    const userId = useAtomValue(userIdAtom);
    const playlists = useAtomValue(cachedPlaylistsAtom);

    const moveToPlaylist = useMoveToPlaylistMutation();

    const filteredPlaylists = playlists.filter(
        (p) => p.id !== fromPlaylistId && p.ownerId === userId && p.name.toLowerCase().includes(filter.toLowerCase()),
    );

    return (
        <SubMenu
            menuStyle={{ minWidth: "260px" }}
            label="Move to playlist"
            onMenuChange={(e) => e.open && setFilter("")}
        >
            <FocusableItem>
                {({ ref }) => (
                    <input
                        ref={ref}
                        type="search"
                        placeholder="Find a playlist"
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                    />
                )}
            </FocusableItem>

            <ScrollAreaWrapper takeOverflow>
                <ScrollArea>
                    {filteredPlaylists.map((p) => (
                        <MenuItem
                            key={p.id}
                            onClick={() =>
                                moveToPlaylist.mutate({
                                    fromPlaylistId,
                                    toPlaylistId: p.id,
                                    tracks,
                                })
                            }
                        >
                            <div className="line-clamp-ellipsis">{p.name}</div>
                        </MenuItem>
                    ))}
                </ScrollArea>
            </ScrollAreaWrapper>
        </SubMenu>
    );
}

const ScrollAreaWrapper = styled(MenuGroup, {
    display: "flex",
    flexDirection: "column",
    maxHeight: "50vh",
});

export default MoveToPlaylistMenuItem;
