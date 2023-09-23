import { TrackDto } from "../../../generated/haly";
import { styled } from "../../common/theme";
import * as Table from "../Table";
import QueueTableRow from "./QueueTableRow";

type QueueTableProps = {
    tracks: TrackDto[];
    indexOffset: number;
};

function QueueTable({ tracks, indexOffset }: QueueTableProps) {
    return (
        <div>
            <TableRoot>
                <Table.Body>
                    {tracks.map((track, idx) => (
                        <QueueTableRow
                            key={idx}
                            index={indexOffset + idx}
                            track={track}
                            isListenedTo={indexOffset === 1}
                        />
                    ))}
                </Table.Body>
            </TableRoot>
        </div>
    );
}

const TableRoot = styled(Table.Root, {
    "& > tbody": {
        tr: {
            gridGap: "$700",
            gridTemplateColumns: "16px 4fr 2fr minmax(120px, 1fr)",
        },
    },

    "& td:nth-of-type(3)": {
        // color: "$white400",
        justifySelf: "start",
    },

    "&& td:nth-of-type(4)": {
        // color: "$white400",
        justifySelf: "end",
    },
});

export default QueueTable;
