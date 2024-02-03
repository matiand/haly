import { useAtomValue } from "jotai";
import React from "react";
import isDeepEqual from "react-fast-compare";

import { PlaylistBriefDto } from "../../generated/haly";
import { userIdAtom } from "../common/atoms/userAtoms";
import { styled } from "../common/theme";
import useContextPlaybackState from "../playback/useContextPlaybackState";
import UserLibraryItem from "./UserLibraryItem";

type UserPlaylistsProps = {
    playlists: PlaylistBriefDto[];
};

function UserPlaylists({ playlists }: UserPlaylistsProps) {
    const userId = useAtomValue(userIdAtom);
    const getPlaybackState = useContextPlaybackState();

    return (
        <List>
            <UserLibraryItem
                item={{ type: "collection" }}
                uri={`spotify:user:${userId}:collection`}
                href="/collection/tracks"
                playbackState={getPlaybackState("collection", true)}
                isPinned
            />

            {playlists.map((p) => {
                const item = {
                    type: "playlist" as const,
                    dto: p,
                    isEditable: p.ownerId === userId,
                };
                const href = `playlist/${p.id}`;
                const uri = `spotify:playlist:${p.id}`;

                return (
                    <UserLibraryItem
                        key={p.id}
                        item={item}
                        uri={uri}
                        href={href}
                        playbackState={getPlaybackState(p.id)}
                    />
                );
            })}
        </List>
    );
}

const List = styled("ul", {
    padding: "$400",

    "& > li": {
        cursor: "pointer",
        height: "32px",
    },
});

export default React.memo(UserPlaylists, isDeepEqual);
