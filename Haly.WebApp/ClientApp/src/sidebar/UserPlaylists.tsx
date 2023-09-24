import { PlaylistBriefDto } from "../../generated/haly";
import { styled } from "../common/theme";
import usePlaybackContextState from "../common/usePlaybackContextState";
import UserLibraryLink from "./UserLibraryLink";

type UserPlaylistsProps = {
    playlists: PlaylistBriefDto[];
};

function UserPlaylists({ playlists }: UserPlaylistsProps) {
    const getPlaybackState = usePlaybackContextState();

    return (
        <List>
            <li>
                <UserLibraryLink
                    name="Liked Songs"
                    href="/collection/tracks"
                    playbackState={getPlaybackState("collection")}
                />
            </li>

            {playlists.map((p) => {
                const href = `playlist/${p.id}`;

                return (
                    <li key={p.id}>
                        <UserLibraryLink name={p.name} href={href} playbackState={getPlaybackState(p.id)} />
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
