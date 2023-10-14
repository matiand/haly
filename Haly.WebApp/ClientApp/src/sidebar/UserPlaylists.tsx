import { useAtomValue } from "jotai";

import { PlaylistBriefDto } from "../../generated/haly";
import { userIdAtom } from "../common/atoms";
import { styled } from "../common/theme";
import useContextPlaybackState from "../playback/useContextPlaybackState";
import UserLibraryLink from "./UserLibraryLink";

type UserPlaylistsProps = {
    playlists: PlaylistBriefDto[];
};

function UserPlaylists({ playlists }: UserPlaylistsProps) {
    const userId = useAtomValue(userIdAtom);
    const getPlaybackState = useContextPlaybackState();

    return (
        <List>
            <li>
                <UserLibraryLink
                    contextUri={`spotify:user:${userId}:collection`}
                    name="Liked Songs"
                    href="/collection/tracks"
                    playbackState={getPlaybackState("collection")}
                />
            </li>

            {playlists.map((p) => {
                const href = `playlist/${p.id}`;
                const contextUri = `spotify:playlist:${p.id}`;

                return (
                    <li key={p.id}>
                        <UserLibraryLink
                            name={p.name}
                            contextUri={contextUri}
                            href={href}
                            playbackState={getPlaybackState(p.id)}
                        />
                    </li>
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

export default UserPlaylists;
