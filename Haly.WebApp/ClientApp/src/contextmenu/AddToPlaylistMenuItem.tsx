import { FocusableItem, MenuDivider, MenuGroup, MenuItem, SubMenu } from "@szhsin/react-menu";
import { useAtomValue } from "jotai";
import { useState } from "react";

import { cachedPlaylists, userIdAtom } from "../common/atoms";

type AddToPlaylistMenuItemProps = {
    trackIds: string[];
};

function AddToPlaylistMenuItem({ trackIds }: AddToPlaylistMenuItemProps) {
    const [filter, setFilter] = useState("");
    const userId = useAtomValue(userIdAtom);
    const playlists = useAtomValue(cachedPlaylists);

    const filteredPlaylists = playlists.filter(
        (p) => p.ownerId === userId && p.name.toLowerCase().includes(filter.toLowerCase()),
    );

    return (
        <SubMenu
            menuStyle={{ minWidth: "260px" }}
            label="Add to playlist"
            overflow="auto"
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
            <MenuGroup>
                <MenuItem
                    onClick={() => {
                        console.log("Creating new playlist...");
                        console.log("Adding tracks...", trackIds);
                    }}
                >
                    Create Playlist
                </MenuItem>

                {filteredPlaylists.length > 0 && <MenuDivider />}
                {filteredPlaylists.map((p) => (
                    <MenuItem key={p.id} onClick={() => console.log("Adding tracks...", trackIds)}>
                        <div className="line-clamp-ellipsis">{p.name}</div>
                    </MenuItem>
                ))}
            </MenuGroup>
        </SubMenu>
    );
}

export default AddToPlaylistMenuItem;
