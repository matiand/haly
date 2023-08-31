import { useParams } from "react-router-dom";

import Playlist from "./Playlist";
import { usePersistedSortOrder } from "./useSortOrder";

function PlaylistWrapper() {
    const { id } = useParams();
    const [sortOrder] = usePersistedSortOrder(id!);

    // I always want the Playlist component to unmount when route changes. This way old tracks from
    // previous playlist don't show up and PlaylistTracks actually uses the initialTracks prop.
    return <Playlist key={id} id={id!} sortOrder={sortOrder} />;
}

export default PlaylistWrapper;
