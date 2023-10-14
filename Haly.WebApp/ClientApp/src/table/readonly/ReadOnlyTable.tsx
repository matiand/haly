import { TrackDto } from "../../../generated/haly";
import { styled } from "../../common/theme";
import * as Table from "../Table";
import TrackDurationIcon from "../TrackDurationIcon";
import ReadOnlyTableRow from "./ReadOnlyTableRow";

type ReadOnlyTableProps = {
    tracks: TrackDto[];
};

function ReadOnlyTable({ tracks }: ReadOnlyTableProps) {
    return (
        <div>
            <TableRoot>
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

    // Fix first cell being hidden on hover.
    "&& tr:hover > td:nth-of-type(1) > div > div": {
        display: "grid",
    },
});

export default ReadOnlyTable;
