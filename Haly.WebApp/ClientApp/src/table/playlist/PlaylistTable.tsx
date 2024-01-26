import { useVirtualizer } from "@tanstack/react-virtual";
import clsx from "clsx";
import { useCallback, useEffect } from "react";

import { PlaylistTrackDto } from "../../../generated/haly";
import { styled, theme } from "../../common/theme";
import useMainScrollArea from "../../common/useMainScrollArea";
import * as Table from "../Table";
import useScrollToTrack from "../useScrollToTrack";
import useSelectionShortcuts from "../useSelectionShortcuts";
import useStickyTableHead from "../useStickyTableHead";
import useTableRowLikedState from "../useTableRowLikedState";
import useTableRowPlaybackState from "../useTableRowPlaybackState";
import useTableRowSelection from "../useTableRowSelection";
import { PlaylistTableHead } from "./PlaylistTableHead";
import PlaylistTableRow from "./PlaylistTableRow";

type PlaylistTableProps = {
    items: PlaylistTrackDto[];
    total: number;
    fetchMoreItems: () => void;
    keepInitialPosition: boolean;
    isLikedSongsCollection: boolean;
};

// Having less rows than this will cause additional fetching to occur.
const FETCH_MORE_THRESHOLD = 50;

function PlaylistTable({
    items,
    total,
    fetchMoreItems,
    keepInitialPosition,
    isLikedSongsCollection,
}: PlaylistTableProps) {
    const getTableRowPlaybackState = useTableRowPlaybackState();
    const getTableRowLikedState = useTableRowLikedState();

    const { selectTableRow, isSelectedRow } = useTableRowSelection(items);
    useSelectionShortcuts(items);

    const { ref, isSticky } = useStickyTableHead();
    const getMainScrollArea = useMainScrollArea();

    const rowVirtualizer = useVirtualizer({
        getScrollElement: getMainScrollArea,
        estimateSize: useCallback(() => theme.tables.rowHeight, []),
        count: total,
        overscan: 24,
    });

    useScrollToTrack({
        getScrollElement: getMainScrollArea,
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
                <PlaylistTableHead hasPodcasts={hasPodcasts} isLikedSongsCollection={isLikedSongsCollection} />

                <Table.Body style={{ height: `${rowVirtualizer.getTotalSize()}px` }}>
                    {rowVirtualizer.getVirtualItems().map((virtualItem) => {
                        const idx = virtualItem.index;
                        const track = items[idx];

                        if (!track) return null;

                        const position = keepInitialPosition ? track.positionInPlaylist + 1 : idx + 1;

                        return (
                            <PlaylistTableRow
                                key={idx}
                                position={position}
                                track={track}
                                playbackState={getTableRowPlaybackState(track.playbackId)}
                                likedState={getTableRowLikedState(track.id, track.playbackId)}
                                isSelected={isSelectedRow(idx)}
                                selectTrack={selectTableRow(idx)}
                                offsetY={virtualItem.start}
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
