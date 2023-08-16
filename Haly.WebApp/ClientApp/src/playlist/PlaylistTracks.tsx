import { useInfiniteQuery } from "@tanstack/react-query";
import { useAtomValue, useSetAtom } from "jotai";
import { useEffect } from "react";

import { PlaylistTrackDtoPaginatedList } from "../../generated/haly";
import {
    playlistDurationAtom,
    playlistSearchTermAtom,
    playlistSongsTotalAtom,
    playlistSortOrderAtom,
} from "../common/atoms";
import halyClient from "../halyClient";
import PlaylistTable from "../table/PlaylistTable";

type PlaylistTracksProps = {
    playlistId: string;
    initialTracks: PlaylistTrackDtoPaginatedList;
    initialDuration: string;
};

const MaxTrackQueryLimit = 200;
const MinTrackQueryOffset = 25;

function PlaylistTracks({ playlistId, initialTracks, initialDuration }: PlaylistTracksProps) {
    const searchTerm = useAtomValue(playlistSearchTermAtom);
    const sortOrder = useAtomValue(playlistSortOrderAtom);

    const setDuration = useSetAtom(playlistDurationAtom);
    const setSongsTotal = useSetAtom(playlistSongsTotalAtom);

    const initialData = { totalDuration: initialDuration, ...initialTracks };

    const tracksQuery = useInfiniteQuery(
        ["playlists", playlistId, "tracks", { searchTerm, sortOrder }],
        async ({ pageParam: offset }) => {
            return halyClient.playlists
                .getTracks({
                    playlistId: playlistId,
                    limit: MaxTrackQueryLimit,
                    offset,
                    sortOrder: sortOrder!,
                    searchTerm: searchTerm!,
                })
                .then((data) => ({ ...data.page, totalDuration: data.totalDuration }));
        },
        {
            initialData: { pages: [initialData], pageParams: [initialData.offset] },
            getPreviousPageParam: (firstPage) => {
                const nextOffset = firstPage.offset - firstPage.limit;
                return nextOffset > MinTrackQueryOffset ? nextOffset : undefined;
            },
            getNextPageParam: (lastPage) => {
                const nextOffset = lastPage.offset + lastPage.limit;
                // console.log("nextpageParam");
                return lastPage.total > nextOffset ? nextOffset : undefined;
            },
        },
    );

    useEffect(() => {
        const firstPage = tracksQuery.data?.pages[0];
        if (firstPage) {
            const duration = firstPage.totalDuration;
            const songsTotal = firstPage.total;

            setDuration(duration);
            setSongsTotal(songsTotal);
        }
    }, [tracksQuery, setDuration, setSongsTotal]);

    const items = tracksQuery.data?.pages.flatMap((p) => p.items) ?? [];
    const total = tracksQuery.data?.pages[0].total || 0;
    const keepInitialPositionIndex = Boolean(searchTerm) && sortOrder === "none";

    const fetchMore = () => {
        if (!tracksQuery.isFetchingNextPage) {
            tracksQuery.fetchNextPage({ cancelRefetch: false });
        }
    };

    return (
        <PlaylistTable
            items={items}
            total={total}
            fetchMoreItems={fetchMore}
            keepInitialPositionIndex={keepInitialPositionIndex}
        />
    );
}

export default PlaylistTracks;
