import { Cell, ColumnDef, flexRender, getCoreRowModel, Header, useReactTable } from "@tanstack/react-table";

import { TrackDto } from "../../generated/haly";
import { TrackAlbumCell, TrackAlbumHeader } from "./TrackAlbumCell";
import { TrackDateAddedCell, TrackDateAddedHeader } from "./TrackDateAddedCell";
import { TrackDurationCell, TrackDurationHeader } from "./TrackDurationCell";
import { TrackIndexCell, TrackIndexHeader } from "./TrackIndexCell";
import { TrackTitleCell, TrackTitleHeader } from "./TrackTitleCell";

const columns: ColumnDef<TrackDto>[] = [
    {
        header: TrackIndexHeader,
        cell: TrackIndexCell,
    },
    {
        header: TrackTitleHeader,
        cell: TrackTitleCell,
    },
    {
        header: TrackAlbumHeader,
        cell: TrackAlbumCell,
    },
    {
        header: TrackDateAddedHeader,
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
