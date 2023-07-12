import { Cell, ColumnDef, flexRender, getCoreRowModel, Header, useReactTable } from "@tanstack/react-table";

import { PlaylistTrackDto } from "../../generated/haly";
import TrackAlbumCell from "./TrackAlbumCell";
import TrackDateAddedCell from "./TrackDateAddedCell";
import TrackDurationCell from "./TrackDurationCell";
import TrackDurationHeader from "./TrackDurationHeader";
import TrackIndexCell from "./TrackIndexCell";
import TrackInformation from "./TrackInformation";

const columns: ColumnDef<PlaylistTrackDto>[] = [
    {
        header: "#",
        cell: TrackIndexCell,
    },
    {
        header: "Title",
        cell: (props) => {
            const track = props.row.original;
            return <TrackInformation track={track} type="cell" />;
        },
    },
    {
        header: "Album",
        cell: TrackAlbumCell,
    },
    {
        header: "Date added",
        cell: TrackDateAddedCell,
    },
    {
        id: "duration",
        header: TrackDurationHeader,
        cell: TrackDurationCell,
    },
];

function useTrackCollection(data: PlaylistTrackDto[]) {
    // const data = useMemo(() => items, []);
    // const columns = useMemo(() => columnDefinitions, []);

    return {
        table: useReactTable({
            data,
            columns,
            getCoreRowModel: getCoreRowModel(),
        }),
        renderRowCell: (cell: Cell<PlaylistTrackDto, unknown>) =>
            flexRender(cell.column.columnDef.cell, cell.getContext()),
        renderHeaderCell: (cell: Header<PlaylistTrackDto, unknown>) =>
            flexRender(cell.column.columnDef.header, cell.getContext()),
    };
}

export default useTrackCollection;
