import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useParams } from "react-router-dom";

import { TrackDto } from "../../generated/haly";
import halyClient from "../halyClient";
import Collection from "./Collection";

type PlaylistTracksProps = {
    initialTracks: TrackDto[];
};

const MaxTrackQueryLimit = 44;
const MinTrackQueryOffset = 25;

function PlaylistTracks({ initialTracks }: PlaylistTracksProps) {
    const { id } = useParams();
    const { ref, inView } = useInView({ rootMargin: "400px" });

    const tracksQuery = useInfiniteQuery(
        ["playlists", id, "tracks"],
        ({ pageParam = MinTrackQueryOffset }) => {
            return halyClient.playlists.getTracks({
                playlistId: id!,
                limit: MaxTrackQueryLimit,
                offset: pageParam,
            });
        },
        {
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

    console.log("shouldRenderMore", inView);

    if (!tracksQuery.isFetchedAfterMount) {
        return (
            <>
                <Collection items={initialTracks} />
                <div aria-hidden="true" ref={ref} />
            </>
        );
    }

    const fetchedTracks = tracksQuery.data?.pages.flatMap((p) => p.items) ?? [];
    const tracks = initialTracks.concat(fetchedTracks);
    return (
        <>
            <Collection items={tracks} />
            <div aria-hidden="true" ref={ref} />
        </>
    );
}

export default PlaylistTracks;
