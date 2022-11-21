import { Cell, ColumnDef, flexRender, getCoreRowModel, Header, useReactTable } from "@tanstack/react-table";
import { differenceInMonths, format, formatDistanceToNow } from "date-fns";

import { TrackDto } from "../../generated/haly";
import TrackTitleCell from "./TrackTitleCell";

const columns: ColumnDef<TrackDto>[] = [
    {
        header: "#",
        cell: (props) => props.row.index + 1,
    },
    { header: "title", cell: (props) => <TrackTitleCell track={props.row.original} /> },
    {
        header: "album",
        cell: (props) => props.row.original.album.name,
    },
    {
        header: "date added",
        cell: (props) => formatAddedAt(props.row.original.addedAt),
    },
    { header: "time", accessorKey: "duration" },
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

function formatAddedAt(addedAtIso: Date) {
    const addedAt = new Date(addedAtIso);
    const diffInMonths = differenceInMonths(new Date(), addedAt);

    return diffInMonths > 0 ? format(addedAt, "MMM d, y") : formatDistanceToNow(addedAt, { addSuffix: true });
}

export default useTrackCollection;
