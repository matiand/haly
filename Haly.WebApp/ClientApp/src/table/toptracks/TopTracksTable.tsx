import { useState } from "react";

import { TrackDto } from "../../../generated/haly";
import { styled } from "../../common/theme";
import * as Table from "../Table";
import useSelectionShortcuts from "../useSelectionShortcuts";
import useTableRowLikedState from "../useTableRowLikedState";
import useTableRowPlaybackState from "../useTableRowPlaybackState";
import useTableRowSelection from "../useTableRowSelection";
import TopTracksTableRow from "./TopTracksTableRow";

type TopTracksTableProps = {
    artistId: string;
    items: TrackDto[];
};

function TopTracksTable({ items }: TopTracksTableProps) {
    const [showMore, setShowMore] = useState(false);
    const getTableRowPlaybackState = useTableRowPlaybackState();
    const getTableRowLikedState = useTableRowLikedState();

    const { selectTableRow, isSelectedRow } = useTableRowSelection(items);
    useSelectionShortcuts(items);

    const showButton = items.length > 5;
    const btnLabel = showMore ? "Show less" : "See more";

    return (
        <div>
            <TableRoot>
                <Table.Body>
                    {items.slice(0, showMore ? 10 : 5).map((t, idx) => (
                        <TopTracksTableRow
                            key={t.id}
                            index={idx}
                            track={t}
                            playbackState={getTableRowPlaybackState(t.playbackId)}
                            likedState={getTableRowLikedState(t.id, t.playbackId)}
                            isSelected={isSelectedRow(idx)}
                            selectTrack={selectTableRow}
                        />
                    ))}
                </Table.Body>
            </TableRoot>

            {showButton && <Button onClick={() => setShowMore((prev) => !prev)}>{btnLabel}</Button>}
        </div>
    );
}

const Button = styled("button", {
    background: "transparent",
    border: "none",
    color: "$white500",
    fontSize: "$200",
    fontWeight: 700,
    padding: "$600",

    "&:hover": {
        color: "$white800",
    },
});

const TableRoot = styled(Table.Root, {
    "& > tbody": {
        tr: {
            gridGap: "$600",
            gridTemplateColumns: "16px 4fr minmax(120px, 1fr)",
        },
    },

    "& td:last-of-type": {
        justifySelf: "end",
    },
});

export default TopTracksTable;
