import { useAtomValue } from "jotai";

import { PlaylistBriefDto } from "../../generated/haly";
import { streamedPlaylistIdAtom } from "../common/atoms";
import { styled } from "../common/theme";
import UserLibraryLink from "./UserLibraryLink";

type UserPlaylistsProps = {
    playlists: PlaylistBriefDto[];
};

function UserPlaylists({ playlists }: UserPlaylistsProps) {
    const streamedPlaylistId = useAtomValue(streamedPlaylistIdAtom);

    return (
        <List>
            <li>
                <UserLibraryLink name="Liked Songs" href="/collection/tracks" isListenedTo={false} />
            </li>

            {playlists.map((p) => {
                const href = `playlist/${p.id}`;

                return (
                    <li key={p.id}>
                        <UserLibraryLink name={p.name} href={href} isListenedTo={p.id === streamedPlaylistId} />
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
