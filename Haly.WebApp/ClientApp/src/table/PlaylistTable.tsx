import { useVirtualizer } from "@tanstack/react-virtual";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

import { PlaylistTrackDto } from "../../generated/haly";
import { styled, theme } from "../common/theme";
import PlaylistTableRow from "./PlaylistTableRow";
import TrackDurationIcon from "./TrackDurationIcon";

type PlaylistTableProps = {
    items: PlaylistTrackDto[];
    total: number;
    fetchMoreItems: () => void;
};

// Having less rows than this will cause additional fetching to occur.
const FETCH_MORE_THRESHOLD = 50;

function PlaylistTable({ items, total, fetchMoreItems }: PlaylistTableProps) {
    const hasPodcasts = items.some((t) => t.type === "Podcast");
    const { ref, inView } = useInView({ initialInView: true });

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

    return (
        <div>
            <div ref={ref} aria-hidden />
            <Table>
                <THead className={inView ? "" : "sticky-head"}>
                    <tr>
                        <th>#</th>
                        <th>Title</th>
                        {/* Occasionally, it may toggle between these two states when the current
                        items slice contains no podcasts, but the likelihood of this happening is
                        quite low. */}
                        <th>{hasPodcasts ? "Album or podcast" : "Album"}</th>
                        <th>Date added</th>
                        <th>
                            <TrackDurationIcon />
                        </th>
                    </tr>
                </THead>

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
});

const THead = styled("thead", {
    background: "",
    display: "block",
    position: "sticky",
    top: `${theme.sizes.userMenuHeight}`,
    zIndex: "$collectionTableHead",
    margin: "0 -$700 $600",
    padding: "0 $700",

    "&.sticky-head": {
        background: "$black500",
        borderBottom: "1px solid $collectionTableHeadBorder",
        boxShadow: "0 -1px 0 0 $collectionTableStickyHead",

        "& > tr": {
            borderBottom: "none",
        },
    },

    "& > tr": {
        borderBottom: "1px solid $collectionTableHeadBorder",
        display: "grid",
        gridGap: "$600",
        gridTemplateColumns: "16px 4fr 2fr minmax(120px, 1fr)",
        height: "36px",
        padding: "0 $600",

        "& > th": {
            alignItems: "center",
            color: "$white700",
            display: "flex",
            fontSize: "$300",
            fontWeight: "500",
        },

        "& > th:nth-of-type(1), & > th:nth-of-type(5)": {
            justifySelf: "end",
        },

        "& > th:nth-of-type(4)": {
            display: "none",
        },

        "& > th:last-of-type": {
            marginRight: "$800",
        },

        "@bp3": {
            gridTemplateColumns: "16px 6fr 4fr 3fr minmax(120px, 1fr)",

            "& > th:nth-of-type(4)": {
                display: "flex",
            },
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

        "&[data-playable=false] > td": {
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

        "@bp3": {
            gridTemplateColumns: "16px 6fr 4fr 3fr minmax(120px, 1fr)",

            "& >td:nth-of-type(4)": {
                display: "flex",
            },
        },
    },
});

export default PlaylistTable;
