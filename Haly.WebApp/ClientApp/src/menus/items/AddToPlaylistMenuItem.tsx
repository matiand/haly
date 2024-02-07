import { FocusableItem, MenuDivider, MenuGroup, MenuItem, SubMenu } from "@szhsin/react-menu";
import { useAtomValue } from "jotai";
import { useState } from "react";

import { DuplicatesStrategy } from "../../../generated/haly";
import { cachedPlaylistsAtom } from "../../common/atoms/playlistAtoms";
import { userIdAtom } from "../../common/atoms/userAtoms";
import { classNames, styled } from "../../common/theme";
import halyClient from "../../halyClient";
import useAddToPlaylistMutation from "../../playlist/useAddToPlaylistMutation";
import useCreatePlaylistMutation from "../../playlist/useCreatePlaylistMutation";
import { ScrollArea } from "../../ui/ScrollArea";

type AddToPlaylistMenuItemProps = {
    collectionUri?: string;
    trackUris?: string[];
};

function AddToPlaylistMenuItem({ collectionUri, trackUris }: AddToPlaylistMenuItemProps) {
    const [filter, setFilter] = useState("");
    const userId = useAtomValue(userIdAtom);
    const playlists = useAtomValue(cachedPlaylistsAtom);

    const createPlaylist = useCreatePlaylistMutation();
    const addToPlaylist = useAddToPlaylistMutation();

    const filteredPlaylists = playlists.filter(
        (p) => p.ownerId === userId && p.name.toLowerCase().includes(filter.toLowerCase()),
    );

    return (
        <SubMenu
            menuStyle={{ minWidth: "260px" }}
            label={collectionUri?.includes("playlist") ? "Add to other playlist" : "Add to playlist"}
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
                    <MenuItem
                        onClick={() =>
                            createPlaylist().then((playlist) => {
                                // We need to update our cache before calling addToPlaylist endpoint.
                                halyClient.me.putMyPlaylists().then(() =>
                                    addToPlaylist.mutate({
                                        playlistId: playlist.id,
                                        collectionUri,
                                        trackUris,
                                        duplicatesStrategy: DuplicatesStrategy.FailWhenAnyDuplicate,
                                    }),
                                );
                            })
                        }
                    >
                        <div>Create Playlist</div>
                    </MenuItem>

                    {filteredPlaylists.length > 0 && <MenuDivider />}

                    {filteredPlaylists.map((p) => (
                        <MenuItem
                            key={p.id}
                            onClick={() => {
                                addToPlaylist.mutate({
                                    playlistId: p.id,
                                    collectionUri,
                                    trackUris,
                                    duplicatesStrategy: DuplicatesStrategy.FailWhenAnyDuplicate,
                                });
                            }}
                        >
                            <div className={classNames.clampEllipsis}>{p.name}</div>
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

export default AddToPlaylistMenuItem;
