import clsx from "clsx";
import { Fragment } from "react";

import { AlbumTrackDto } from "../../generated/haly";
import { styled, theme } from "../common/theme";
import { AlbumTableDiscRow, AlbumTableTrackRow } from "./AlbumTableRow";
import TrackDurationIcon from "./TrackDurationIcon";
import useStickyTableHead from "./useStickyTableHead";

type AlbumTableProps = {
    items: AlbumTrackDto[];
};

function AlbumTable({ items }: AlbumTableProps) {
    const { ref, isSticky } = useStickyTableHead();

    const tracksByDisk = groupByDiscNumber(items);
    const disks = Object.keys(tracksByDisk)
        .map((d) => Number.parseInt(d, 10))
        .sort();

    return (
        <>
            <div ref={ref} aria-hidden />
            <Table className={clsx({ isSticky })}>
                <THead>
                    <tr>
                        <th>#</th>
                        <th>Title</th>
                        <th>
                            <TrackDurationIcon />
                        </th>
                    </tr>
                </THead>

                <TBody>
                    {disks.length > 1
                        ? disks.map((disc) => {
                              const items = tracksByDisk[disc];

                              return (
                                  <Fragment key={disc}>
                                      <AlbumTableDiscRow discNumber={disc} />

                                      {items.map((t, idx) => (
                                          <AlbumTableTrackRow key={t.spotifyId} index={idx + 1} track={t} />
                                      ))}
                                  </Fragment>
                              );
                          })
                        : items.map((t, idx) => <AlbumTableTrackRow key={t.spotifyId} index={idx + 1} track={t} />)}
                </TBody>
            </Table>
        </>
    );
}

const groupByDiscNumber = (items: AlbumTrackDto[]) => {
    return items.reduce<Record<number, AlbumTrackDto[]>>((groups, item) => {
        const key = item.discNumber;
        if (!groups[key]) {
            groups[key] = [];
        }
        groups[key].push(item);

        return groups;
    }, {});
};

const gridTemplateColumns = "16px 4fr minmax(120px, 1fr)";

const Table = styled("table", {
    display: "block",
    userSelect: "none",

    "& th, td": {
        padding: 0,
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

const THead = styled("thead", {
    background: "",
    display: "block",
    position: "sticky",
    top: `${theme.sizes.upperMenuHeight}`,
    zIndex: "$collectionTableHead",
    margin: "0 -$700 $600",
    padding: "0 $700",

    "& > tr": {
        borderBottom: "1px solid $collectionTableHeadBorder",
        display: "grid",
        gridGap: "$700",

        gridTemplateColumns,
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
            justifySelf: "end",
            marginRight: "$800",
        },
    },
});

const TBody = styled("tbody", {
    $$rowHeight: `${theme.tables.rowHeight}px`,

    display: "block",

    "& > tr": {
        display: "grid",
        gridGap: "$700",
        gridTemplateColumns,
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

        "& > td:last-of-type": {
            color: "$white400",
            justifySelf: "end",
            fontWeight: 500,
        },
    },
});

export default AlbumTable;
