import { styled } from "../common/theme";
import { ScrollArea } from "../ui/ScrollArea";
import useMyPlaylistsQuery from "./useMyPlaylistsQuery";
import UserLibraryHeader from "./UserLibraryHeader";
import UserPlaylists from "./UserPlaylists";

function UserLibrary() {
    const query = useMyPlaylistsQuery();

    if (!query.data) return <Wrapper />;

    return (
        <Wrapper>
            <UserLibraryHeader />

            <ScrollArea>
                <UserPlaylists playlists={query.data} />
            </ScrollArea>
        </Wrapper>
    );
}

const Wrapper = styled("div", {
    display: "flex",
    flexFlow: "column",
    height: "100%",
    minHeight: 0,
});

export default UserLibrary;
