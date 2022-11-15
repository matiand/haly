import { useInfiniteQuery } from "@tanstack/react-query";
import React, { Ref, useEffect } from "react";
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
    const { ref, inView, entry } = useInView({
        rootMargin: "0px 0px 600px 0px",
        // Default root doesn't work (I think it's cause our layout has fixed footer)
        root: document.getElementById("playlist-container"),
    });

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
        console.log("inEffect");
        if (inView && tracksQuery.hasNextPage && !tracksQuery.isFetchingNextPage) {
            console.log("twice");
            tracksQuery.fetchNextPage();
        }
    }, [inView, tracksQuery]);

    console.log("shouldRenderMore", inView);
    console.log("entry", entry);

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
