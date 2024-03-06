import clsx from "clsx";

import { TrackDto } from "../../../generated/haly";
import { styled } from "../../common/theme";
import * as Table from "../Table";
import TrackDurationIcon from "../TrackDurationIcon";
import useSelectionShortcuts from "../useSelectionShortcuts";
import useStickyTableHead from "../useStickyTableHead";
import useTableRowLikedState from "../useTableRowLikedState";
import useTableRowSelection from "../useTableRowSelection";
import BasicTableRow from "./BasicTableRow";
import useBasicTableRowPlaybackState from "./useBasicTableRowPlaybackState";

type BasicTableProps = {
    items: TrackDto[];
    withHeader?: boolean;
    withAlbumCell?: boolean;
    showArtists?: boolean;
};

function BasicTable({ items, withHeader, withAlbumCell, showArtists }: BasicTableProps) {
    const getTableRowPlaybackState = useBasicTableRowPlaybackState();
    const getTableRowLikedState = useTableRowLikedState();
    const { ref, isSticky } = useStickyTableHead();

    const { selectTableRow, isSelectedRow } = useTableRowSelection(items);
    useSelectionShortcuts(items);

    return (
        <div>
            <div ref={ref} aria-hidden />
            <TableRoot className={clsx({ isSticky, withAlbumCell })}>
                {withHeader && (
                    <Table.Head>
                        <tr>
                            <th>#</th>
                            <th>Title</th>

                            {withAlbumCell && <th>Album</th>}

                            <th>
                                <TrackDurationIcon />
                            </th>
                        </tr>
                    </Table.Head>
                )}

                <Table.Body>
                    {items.map((t, idx) => (
                        <BasicTableRow
                            key={t.id}
                            index={idx}
                            track={t}
                            playbackState={getTableRowPlaybackState(t.playbackId)}
                            likedState={getTableRowLikedState(t.id, t.playbackId)}
                            isSelected={isSelectedRow(idx)}
                            selectTrack={selectTableRow}
                            withAlbumCell={withAlbumCell}
                            showArtists={showArtists}
                        />
                    ))}
                </Table.Body>
            </TableRoot>
        </div>
    );
}

const TableRoot = styled(Table.Root, {
    "& > tbody, & > thead": {
        tr: {
            gridGap: "$600",
            gridTemplateColumns: "16px 4fr minmax(120px, 1fr)",
        },
    },

    "&.withAlbumCell tr": {
        gridTemplateColumns: "16px 4fr 2fr minmax(120px, 1fr)",
    },

    "& td:last-of-type": {
        justifySelf: "end",
    },
});

export default BasicTable;
