import { useDroppable } from "@dnd-kit/core";
import clsx from "clsx";

import { styled } from "../common/theme";
import { ScrollArea } from "../ui/ScrollArea";
import useMyPlaylistsQuery from "./useMyPlaylistsQuery";
import UserLibraryHeader from "./UserLibraryHeader";
import UserPlaylists from "./UserPlaylists";

function UserLibrary() {
    const query = useMyPlaylistsQuery();

    const { isOver, setNodeRef } = useDroppable({
        id: "user-library-area",
    });

    if (!query.data) return <Wrapper />;

    return (
        <Wrapper className={clsx({ isOver })} ref={setNodeRef}>
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

    "&.isOver": {
        outline: "2px solid $primary300",
    },
});

export default UserLibrary;
