import { useVirtualizer } from "@tanstack/react-virtual";
import clsx from "clsx";
import { useAtomValue } from "jotai";
import { useEffect } from "react";

import { PlaylistTrackDto } from "../../../generated/haly";
import { likedSongIdsAtom } from "../../common/atoms";
import { styled, theme } from "../../common/theme";
import useMainScrollArea from "../../common/useMainScrollArea";
import * as Table from "../Table";
import useScrollToTrack from "../useScrollToTrack";
import useStickyTableHead from "../useStickyTableHead";
import useTableRowPlaybackState from "../useTableRowPlaybackState";
import { PlaylistTableHead } from "./PlaylistTableHead";
import PlaylistTableRow from "./PlaylistTableRow";

type PlaylistTableProps = {
    playlistId: string;
    items: PlaylistTrackDto[];
    total: number;
    fetchMoreItems: () => void;
    keepInitialPositionIndex: boolean;
    isLikedSongsCollection: boolean;
};

// Having less rows than this will cause additional fetching to occur.
const FETCH_MORE_THRESHOLD = 50;

function PlaylistTable({
    playlistId,
    items,
    total,
    fetchMoreItems,
    keepInitialPositionIndex,
    isLikedSongsCollection,
}: PlaylistTableProps) {
    const likedTrackIds = useAtomValue(likedSongIdsAtom);
    const getTableRowPlaybackState = useTableRowPlaybackState(isLikedSongsCollection ? "collection" : playlistId);

    const { ref, isSticky } = useStickyTableHead();
    const mainScrollArea = useMainScrollArea();

    const rowVirtualizer = useVirtualizer({
        getScrollElement: () => mainScrollArea,
        estimateSize: () => theme.tables.rowHeight,
        count: total,
        overscan: 24,
    });

    useScrollToTrack({
        mainScrollArea,
        items,
        itemsTotal: total,
        fetchMoreItems,
    });

    useEffect(() => {
        const currentTotal = items.length;
        const virtualEnd = rowVirtualizer.range.endIndex + 1;
        const itemsLeft = currentTotal - virtualEnd;

        if (itemsLeft <= FETCH_MORE_THRESHOLD && total != currentTotal) {
            fetchMoreItems();
        }
    }, [rowVirtualizer, rowVirtualizer.range, items, total, fetchMoreItems]);

    if (items.length === 0) return null;

    // Occasionally for playlists with podcasts this value can be false, when the current items
    // slice is missing them. The likelihood of this happening is quite low.
    const hasPodcasts = items.some((t) => !t.isSong);
    const showAddedAtColumn = items.some((val) => val.addedAt.getFullYear() > 1970);

    return (
        <div>
            <div ref={ref} aria-hidden />
            <TableRoot
                className={clsx({
                    showAddedAtColumn,
                    isSticky,
                })}
            >
                <PlaylistTableHead hasPodcasts={hasPodcasts} />

                <Table.Body style={{ height: `${rowVirtualizer.getTotalSize()}px` }}>
                    {rowVirtualizer.getVirtualItems().map((virtualItem) => {
                        const idx = virtualItem.index;
                        const track = items[idx];

                        if (!track) return null;

                        const trackIdx = keepInitialPositionIndex ? track.positionInPlaylist + 1 : idx + 1;
                        const isLiked = !!track.spotifyId && likedTrackIds.includes(track.spotifyId);

                        return (
                            <PlaylistTableRow
                                key={idx}
                                index={trackIdx}
                                track={track}
                                contextUri={`spotify:playlist:${playlistId}`}
                                playbackState={getTableRowPlaybackState(track.spotifyId)}
                                isLiked={isLiked}
                                start={virtualItem.start}
                            />
                        );
                    })}
                </Table.Body>
            </TableRoot>
        </div>
    );
}

const TableRoot = styled(Table.Root, {
    "& > tbody, & > thead": {
        tr: {
            gridGap: "$600",
            gridTemplateColumns: "16px 4fr 2fr minmax(120px, 1fr)",

            "td::nth-of-type(5)": {
                justifySelf: "end",
            },
        },
    },

    "&.showAddedAtColumn tr": {
        "@bp3": {
            gridTemplateColumns: "16px 6fr 4fr 3fr minmax(120px, 1fr)",

            "td:nth-of-type(4), th:nth-of-type(4)": {
                display: "flex",
            },
        },
    },

    "& th:nth-of-type(4), & td:nth-of-type(4)": {
        display: "none",
    },

    "& th:nth-of-type(5)": {
        justifySelf: "end",
        flexFlow: "row-reverse",
    },

    "& td:nth-of-type(5)": {
        justifySelf: "end",
    },
});

export default PlaylistTable;
