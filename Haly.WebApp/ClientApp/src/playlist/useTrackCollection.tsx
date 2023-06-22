import { Cell, ColumnDef, flexRender, getCoreRowModel, Header, useReactTable } from "@tanstack/react-table";

import { TrackDto } from "../../generated/haly";
import TrackAlbumCell from "./TrackAlbumCell";
import TrackDateAddedCell from "./TrackDateAddedCell";
import TrackDurationCell from "./TrackDurationCell";
import TrackDurationHeader from "./TrackDurationHeader";
import TrackIndexCell from "./TrackIndexCell";
import TrackTitleCell from "./TrackTitleCell";

const columns: ColumnDef<TrackDto>[] = [
    {
        header: "#",
        cell: TrackIndexCell,
    },
    {
        header: "Title",
        cell: TrackTitleCell,
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

function useTrackCollection(data: TrackDto[]) {
    // const data = useMemo(() => items, []);
    // const columns = useMemo(() => columnDefinitions, []);

    return {
        table: useReactTable({ data, columns, getCoreRowModel: getCoreRowModel() }),
        renderRowCell: (cell: Cell<TrackDto, unknown>) => flexRender(cell.column.columnDef.cell, cell.getContext()),
        renderHeaderCell: (cell: Header<TrackDto, unknown>) =>
            flexRender(cell.column.columnDef.header, cell.getContext()),
    };
}

export default useTrackCollection;
