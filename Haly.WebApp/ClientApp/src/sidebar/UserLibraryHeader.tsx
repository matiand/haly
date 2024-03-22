import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { MdLibraryMusic } from "react-icons/md";

import { GetMyPlaylistsQueryKey } from "../common/queryKeys";
import { styled } from "../common/theme";
import useContextMenu from "../menus/useContextMenu";
import useCreatePlaylistMutation from "../playlist/useCreatePlaylistMutation";
import CreatePlaylistButton from "./CreatePlaylistButton";
import UserLibraryContextMenu from "./UserLibraryContextMenu";

function UserLibraryHeader() {
    const { menuProps, onContextMenu } = useContextMenu();

    const queryClient = useQueryClient();
    const createPlaylist = useCreatePlaylistMutation(() => {
        queryClient.invalidateQueries({ queryKey: GetMyPlaylistsQueryKey });
        // We show a toast instead of navigating to the new playlist.
        toast("Created new playlist");
    });

    return (
        <>
            <Header onContextMenu={onContextMenu}>
                <Title>
                    <span aria-hidden>
                        <TitleIcon />
                    </span>
                    <h2>Your Library</h2>
                </Title>

                <CreatePlaylistButton createPlaylist={createPlaylist} />
            </Header>

            <UserLibraryContextMenu menuProps={menuProps} createPlaylist={createPlaylist} />
        </>
    );
}

const Header = styled("header", {
    alignItems: "center",
    boxShadow: "0 3px 6px rgba(0,0,0,.5)",
    color: "$white600",
    display: "flex",
    justifyContent: "space-between",
    padding: "$400 $600",
});

const Title = styled("div", {
    alignItems: "center",
    display: "flex",
    gap: "$400",
    height: "40px",

    "& > h2": {
        fontSize: "$400",
    },
});

const TitleIcon = styled(MdLibraryMusic, {
    height: "24px",
    width: "24px",
});

export default UserLibraryHeader;
