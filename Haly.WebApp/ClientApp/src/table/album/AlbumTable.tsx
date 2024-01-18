import clsx from "clsx";
import { Fragment } from "react";

import { AlbumTrackDto } from "../../../generated/haly";
import { styled } from "../../common/theme";
import useMainScrollArea from "../../common/useMainScrollArea";
import * as Table from "../Table";
import TrackDurationIcon from "../TrackDurationIcon";
import useScrollToTrack from "../useScrollToTrack";
import useSelectionShortcuts from "../useSelectionShortcuts";
import useStickyTableHead from "../useStickyTableHead";
import useTableRowLikedState from "../useTableRowLikedState";
import useTableRowPlaybackState from "../useTableRowPlaybackState";
import useTableRowSelection from "../useTableRowSelection";
import { AlbumTableDiscRow, AlbumTableTrackRow } from "./AlbumTableRow";

type AlbumTableProps = {
    albumId: string;
    items: AlbumTrackDto[];
};

function AlbumTable({ items }: AlbumTableProps) {
    const getTableRowPlaybackState = useTableRowPlaybackState();
    const getTableRowLikedState = useTableRowLikedState();
    const { ref, isSticky } = useStickyTableHead();

    const { selectTableRow, isSelectedRow } = useTableRowSelection(items);
    useSelectionShortcuts(items);

    const mainScrollArea = useMainScrollArea();
    useScrollToTrack({
        mainScrollArea,
        items,
        itemsTotal: items.length,
    });

    const tracksByDisk = groupByDiscNumber(items);
    const disks = Object.keys(tracksByDisk)
        .map((d) => Number.parseInt(d, 10))
        .sort();

    return (
        <>
            <div ref={ref} aria-hidden />
            <TableRoot className={clsx({ isSticky })}>
                <Table.Head>
                    <tr>
                        <th>#</th>
                        <th>Title</th>
                        <th>
                            <TrackDurationIcon />
                        </th>
                    </tr>
                </Table.Head>

                <Table.Body>
                    {disks.length > 1
                        ? disks.map((disc) => {
                              const discItems = tracksByDisk[disc];

                              return (
                                  <Fragment key={disc}>
                                      <AlbumTableDiscRow discNumber={disc} />

                                      {discItems.map((t, idx) => {
                                          const globalIndex = items.findIndex((item) => item.id === t.id);

                                          return (
                                              <AlbumTableTrackRow
                                                  key={t.id}
                                                  position={idx + 1}
                                                  track={t}
                                                  playbackState={getTableRowPlaybackState(t.playbackId)}
                                                  likedState={getTableRowLikedState(t.id, t.playbackId)}
                                                  isSelected={isSelectedRow(globalIndex)}
                                                  selectTrack={selectTableRow(globalIndex)}
                                              />
                                          );
                                      })}
                                  </Fragment>
                              );
                          })
                        : items.map((t, idx) => (
                              <AlbumTableTrackRow
                                  key={t.id}
                                  position={idx + 1}
                                  track={t}
                                  playbackState={getTableRowPlaybackState(t.playbackId)}
                                  likedState={getTableRowLikedState(t.id, t.playbackId)}
                                  isSelected={isSelectedRow(idx)}
                                  selectTrack={selectTableRow(idx)}
                              />
                          ))}
                </Table.Body>
            </TableRoot>
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

const TableRoot = styled(Table.Root, {
    "& > tbody, & > thead": {
        tr: {
            gridGap: "$700",
            gridTemplateColumns: "16px 4fr minmax(120px, 1fr)",
        },
    },

    "& td:nth-of-type(3)": {
        color: "$white400",
        justifySelf: "end",
    },
});

export default AlbumTable;
