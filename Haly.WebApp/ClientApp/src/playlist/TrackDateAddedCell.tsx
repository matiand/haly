import { CellContext } from "@tanstack/react-table";
import { differenceInMonths, format, formatDistanceToNowStrict } from "date-fns";

import { PlaylistTrackDto } from "../../generated/haly";

function TrackDateAddedCell(ctx: CellContext<PlaylistTrackDto, unknown>) {
    return <div>{formatAddedAt(ctx.row.original.addedAt)}</div>;
}

function formatAddedAt(addedAtIso: Date) {
    const addedAt = new Date(addedAtIso);
    const diffInMonths = differenceInMonths(new Date(), addedAt);

    return diffInMonths > 0 ? format(addedAt, "MMM d, y") : formatDistanceToNowStrict(addedAt, { addSuffix: true });
}

export default TrackDateAddedCell;
