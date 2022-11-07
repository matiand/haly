import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useParams } from "react-router-dom";

import { styled } from "../common/theme";
import halyClient from "../halyClient";
import Collection from "./Collection";
import PlaylistControls from "./PlaylistControls";
import PlaylistHeader from "./PlaylistHeader";

const MaxTrackQueryLimit = 100;

function Playlist() {
    const { id } = useParams();
    const { ref, inView } = useInView({ rootMargin: "400px" });
    const playlistQuery = useQuery(["playlists", id], () => halyClient.playlists.getPlaylist({ id: id! }), {
        suspense: true,
    });
    const tracksQuery = useInfiniteQuery(
        ["playlists", id, "tracks"],
        ({ pageParam = 0 }) => {
            return halyClient.playlists.getTracks({
                playlistId: id!,
                limit: MaxTrackQueryLimit,
                offset: pageParam,
            });
        },
        {
            initialData: { pages: [playlistQuery.data!.tracks], pageParams: [0] },
            getNextPageParam: (lastPage) => {
                const nextOffset = lastPage.offset + lastPage.limit;
                return lastPage.total > nextOffset ? nextOffset : undefined;
            },
        },
    );

    useEffect(() => {
        if (inView && !playlistQuery.isFetching && !tracksQuery.isFetchingNextPage) {
            tracksQuery.fetchNextPage();
        }
    }, [inView, playlistQuery, tracksQuery]);

    if (!playlistQuery.data || !tracksQuery.data) {
        return null;
    }

    // console.log("prev", tracksQuery.hasPreviousPage);
    // console.log("next", tracksQuery.hasNextPage);
    // console.log(inView);

    const playlist = playlistQuery.data;

    return (
        <Main>
            <PlaylistHeader
                name={playlist.name}
                owner="junco"
                songsCount={tracksQuery.data.pages[0].total}
                totalDuration="1hr 51min"
            />
            <PlaylistControls />
            <Collection pages={tracksQuery.data.pages} />
            <div aria-hidden="true" ref={ref} />
        </Main>
    );
}

const Main = styled("main", {
    position: "relative",
    "&&": {
        background: "linear-gradient(to bottom, #535353, $black600 500px)",
    },
});

export default Playlist;
