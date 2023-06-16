import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

import { TrackDtoPaginatedList } from "../../generated/haly";
import halyClient from "../halyClient";
import Collection from "./Collection";

type PlaylistTracksProps = {
    playlistId: string;
    initialTracks: TrackDtoPaginatedList;
};

const MaxTrackQueryLimit = 100;
const MinTrackQueryOffset = 25;

function PlaylistTracks({ playlistId, initialTracks }: PlaylistTracksProps) {
    const { ref, inView } = useInView({
        rootMargin: "0px 0px 600px 0px",
        // Default root doesn't work (I think it's cause our layout has fixed footer)
        root: document.getElementById("playlist-container"),
    });

    const tracksQuery = useInfiniteQuery(
        ["playlists", playlistId, "tracks"],
        ({ pageParam = MinTrackQueryOffset }) => {
            return halyClient.playlists.getTracks({
                playlistId: playlistId,
                limit: MaxTrackQueryLimit,
                offset: pageParam,
            });
        },
        {
            // 15 seconds of staleTime, without this the query will immediately refetch, negating any advantage of using initialData
            staleTime: 1000 * 15,
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

    useEffect(() => {
        if (inView && tracksQuery.hasNextPage && !tracksQuery.isFetchingNextPage) {
            tracksQuery.fetchNextPage();
        }
    }, [inView, tracksQuery]);

    const items = tracksQuery.data?.pages.flatMap((p) => p.items) ?? [];
    return (
        <>
            <Collection items={items} />
            <div aria-hidden="true" ref={ref} />
        </>
    );
}

export default PlaylistTracks;
