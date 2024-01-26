import clsx from "clsx";

import { styled } from "../common/theme";
import useDroppableArea from "../dnd/useDroppableArea";
import { ScrollArea } from "../ui/ScrollArea";
import useMyPlaylistsQuery from "./useMyPlaylistsQuery";
import UserLibraryHeader from "./UserLibraryHeader";
import UserPlaylists from "./UserPlaylists";

function UserLibrary() {
    const query = useMyPlaylistsQuery();

    const { droppableRef, classNames: dndClassNames } = useDroppableArea({
        id: "library",
        disabled: false,
    });

    if (!query.data) return <Wrapper />;

    return (
        <Wrapper ref={droppableRef} className={clsx({ ...dndClassNames })}>
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
