import DroppableArea from "../dnd/DroppableArea";
import { ScrollArea } from "../ui/ScrollArea";
import useMyPlaylistsQuery from "./useMyPlaylistsQuery";
import UserLibraryHeader from "./UserLibraryHeader";
import UserPlaylists from "./UserPlaylists";

function UserLibrary() {
    const query = useMyPlaylistsQuery();

    return (
        <DroppableArea
            area={{
                id: "library",
                disabled: false,
            }}
            style={{
                display: "flex",
                flexFlow: "column",
                height: "100%",
                minHeight: 0,
            }}
        >
            <UserLibraryHeader />

            <ScrollArea>
                <UserPlaylists playlists={query.data ?? []} />
            </ScrollArea>
        </DroppableArea>
    );
}

export default UserLibrary;
