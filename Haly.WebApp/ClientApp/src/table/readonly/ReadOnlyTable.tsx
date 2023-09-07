import clsx from "clsx";

import { TrackDto } from "../../../generated/haly";
import { styled } from "../../common/theme";
import * as Table from "../Table";
import TrackDurationIcon from "../TrackDurationIcon";
import useStickyTableHead from "../useStickyTableHead";
import ReadOnlyTableRow from "./ReadOnlyTableRow";

type ReadOnlyTableProps = {
    tracks: TrackDto[];
};

function ReadOnlyTable({ tracks }: ReadOnlyTableProps) {
    const { ref, isSticky } = useStickyTableHead();

    return (
        <div>
            <div ref={ref} aria-hidden />
            <TableRoot className={clsx({ isSticky })}>
                <Table.Head>
                    <tr>
                        <th>Title</th>
                        <th>Album or podcast</th>
                        <th>
                            <TrackDurationIcon />
                        </th>
                    </tr>
                </Table.Head>

                <Table.Body>
                    {tracks.map((track, idx) => (
                        <ReadOnlyTableRow key={idx} track={track} />
                    ))}
                </Table.Body>
            </TableRoot>
        </div>
    );
}

const TableRoot = styled(Table.Root, {
    "& > tbody, & > thead": {
        tr: {
            gridGap: "$700",
            gridTemplateColumns: "4fr 2fr minmax(120px, 1fr)",
        },
    },

    "&& th:nth-of-type(1)": {
        justifySelf: "start",
    },

    "&& td:nth-of-type(1)": {
        justifySelf: "start",
    },

    "& td:nth-of-type(3)": {
        color: "$white400",
        justifySelf: "end",
    },
});

export default ReadOnlyTable;
