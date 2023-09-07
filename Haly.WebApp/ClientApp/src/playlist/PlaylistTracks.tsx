import { useInfiniteQuery } from "@tanstack/react-query";
import { useAtomValue, useSetAtom } from "jotai";
import { useEffect } from "react";

import { PlaylistTrackDtoPaginatedList } from "../../generated/haly";
import { playlistSearchTermAtom, playlistSliceDurationAtom, playlistSliceSongsTotalAtom } from "../common/atoms";
import halyClient from "../halyClient";
import PlaylistTable from "../table/playlist/PlaylistTable";
import { PlaylistSortOrder } from "./useSortOrder";

type PlaylistTracksProps = {
    playlistId: string;
    sortOrder: PlaylistSortOrder;
    initialTracks: PlaylistTrackDtoPaginatedList;
};

const MaxTrackQueryLimit = 200;
const MinTrackQueryOffset = 25;

function PlaylistTracks({ playlistId, sortOrder, initialTracks }: PlaylistTracksProps) {
    const searchTerm = useAtomValue(playlistSearchTermAtom);

    const setSliceDuration = useSetAtom(playlistSliceDurationAtom);
    const setSliceSongsTotal = useSetAtom(playlistSliceSongsTotalAtom);

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
            keepPreviousData: true,
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

    useEffect(() => {
        return () => {
            setSliceDuration(null);
            setSliceSongsTotal(null);
        };
    }, [playlistId, setSliceDuration, setSliceSongsTotal]);

    useEffect(() => {
        const firstPage = tracksQuery.data?.pages[0];

        if (firstPage) {
            const duration = firstPage.totalDuration;
            const songsTotal = firstPage.total;

            setSliceDuration(duration);
            setSliceSongsTotal(songsTotal);
        }
    }, [tracksQuery, setSliceDuration, setSliceSongsTotal]);

    const items = tracksQuery.data?.pages.flatMap((p) => p.items) ?? [];
    const total = tracksQuery.data?.pages[0].total || 0;
    const keepInitialPositionIndex = Boolean(searchTerm) && !sortOrder;

    const fetchMore = () => {
        if (!tracksQuery.isFetchingNextPage) {
            tracksQuery.fetchNextPage({ cancelRefetch: false });
        }
    };

    if (tracksQuery.isInitialLoading) {
        return (
            <PlaylistTable
                items={initialTracks.items}
                total={initialTracks.total}
                fetchMoreItems={fetchMore}
                keepInitialPositionIndex={keepInitialPositionIndex}
            />
        );
    }

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
