import { useInfiniteQuery } from "@tanstack/react-query";

import { PlaylistTrackDtoPaginatedList } from "../../generated/haly";
import halyClient from "../halyClient";
import PlaylistTable from "../table/PlaylistTable";

type PlaylistTracksProps = {
    playlistId: string;
    initialTracks: PlaylistTrackDtoPaginatedList;
};

const MaxTrackQueryLimit = 200;
const MinTrackQueryOffset = 25;

function PlaylistTracks({ playlistId, initialTracks }: PlaylistTracksProps) {
    const tracksQuery = useInfiniteQuery(
        ["playlists", playlistId, "tracks"],
        async ({ pageParam: offset }) => {
            return halyClient.playlists
                .getTracks({
                    playlistId: playlistId,
                    limit: MaxTrackQueryLimit,
                    offset,
                })
                .then((data) => data.page);
        },
        {
            initialData: { pages: [initialTracks], pageParams: [initialTracks.offset] },
            getPreviousPageParam: (firstPage) => {
                const nextOffset = firstPage.offset - firstPage.limit;
                return nextOffset > MinTrackQueryOffset ? nextOffset : undefined;
            },
            getNextPageParam: (lastPage) => {
                const nextOffset = lastPage.offset + lastPage.limit;
                return lastPage.total > nextOffset ? nextOffset : undefined;
            },
        },
    );

    const items = tracksQuery.data?.pages.flatMap((p) => p.items) ?? [];
    const total = initialTracks.total;

    const fetchMore = () => {
        if (!tracksQuery.isFetchingNextPage) {
            tracksQuery.fetchNextPage({ cancelRefetch: false });
        }
    };

    return <PlaylistTable items={items} total={total} fetchMoreItems={fetchMore} />;
}

export default PlaylistTracks;
