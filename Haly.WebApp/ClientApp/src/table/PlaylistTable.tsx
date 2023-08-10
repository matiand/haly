import { useVirtualizer } from "@tanstack/react-virtual";
import clsx from "clsx";
import { useEffect } from "react";

import { PlaylistTrackDto } from "../../generated/haly";
import { styled, theme } from "../common/theme";
import { PlaylistTableHead } from "./PlaylistTableHead";
import PlaylistTableRow from "./PlaylistTableRow";
import useStickyTableHead from "./useStickyTableHead";

type PlaylistTableProps = {
    items: PlaylistTrackDto[];
    total: number;
    fetchMoreItems: () => void;
};

// Having less rows than this will cause additional fetching to occur.
const FETCH_MORE_THRESHOLD = 50;

function PlaylistTable({ items, total, fetchMoreItems }: PlaylistTableProps) {
    const { ref, isSticky } = useStickyTableHead();
    const rowVirtualizer = useVirtualizer({
        getScrollElement: () => document.querySelector("main div[data-overlayscrollbars-viewport]"),
        estimateSize: () => theme.tables.rowHeight,
        count: total,
        overscan: 24,
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
    const hasPodcasts = items.some((t) => t.type === "Podcast");
    const showAddedAtColumn = items.some((val) => val.addedAt.getFullYear() > 1970);

    return (
        <div>
            <div ref={ref} aria-hidden />
            <Table className={clsx({ showAddedAtColumn, isSticky })}>
                <PlaylistTableHead hasPodcasts={hasPodcasts} />

                <TBody style={{ height: `${rowVirtualizer.getTotalSize()}px` }}>
                    {rowVirtualizer.getVirtualItems().map((virtualItem) => {
                        const idx = virtualItem.index;
                        const track = items[idx];

                        return (
                            track && (
                                <PlaylistTableRow
                                    key={track.positionInPlaylist}
                                    index={track.positionInPlaylist + 1}
                                    track={track}
                                    start={virtualItem.start}
                                />
                            )
                        );
                    })}
                </TBody>
            </Table>
        </div>
    );
}

const Table = styled("table", {
    display: "block",
    userSelect: "none",

    "& th, td": {
        padding: 0,
    },

    "&.showAddedAtColumn tr": {
        "@bp3": {
            gridTemplateColumns: "16px 6fr 4fr 3fr minmax(120px, 1fr)",

            "td:nth-of-type(4), th:nth-of-type(4)": {
                display: "flex",
            },
        },
    },

    "&.isSticky > thead": {
        background: "$black500",
        borderBottom: "1px solid $collectionTableHeadBorder",
        boxShadow: "0 -1px 0 0 $collectionTableStickyHead",

        "& > tr": {
            borderBottom: "none",
        },
    },
});

const TBody = styled("tbody", {
    $$rowHeight: `${theme.tables.rowHeight}px`,

    display: "block",
    position: "relative",

    tr: {
        display: "grid",
        gridGap: "$600",
        gridTemplateColumns: "16px 4fr 2fr minmax(120px, 1fr)",
        height: "$$rowHeight",
        padding: "0 $600",

        "& > td": {
            alignItems: "center",
            display: "flex",

            "& button": {
                opacity: 0,
            },
        },

        "&:hover": {
            background: "$trackHover",
            borderRadius: "4px",
            "& td:nth-of-type(1) > div > span": {
                display: "none",
            },

            "& a": {
                color: "$white800",
            },

            "& button": {
                opacity: 1,
            },
        },

        "&.disabled > td": {
            opacity: 0.4,
        },

        "& > td:nth-of-type(1)": {
            color: "$white500",
            fontSize: "$300",
            fontWeight: 500,
            justifySelf: "center",
        },

        "& > td:nth-of-type(2)": {
            color: "$white500",
            fontSize: "$300",
        },

        "& > td:nth-of-type(4)": {
            color: "$white400",
            display: "none",
            fontSize: "$300",
            fontWeight: 500,
        },

        "& > td:nth-of-type(5)": {
            color: "$white400",
            justifySelf: "end",
            fontWeight: 500,
        },
    },
});

export default PlaylistTable;
