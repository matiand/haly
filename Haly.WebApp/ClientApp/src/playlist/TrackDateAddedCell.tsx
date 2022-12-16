import { CellContext } from "@tanstack/react-table";
import { differenceInMonths, format, formatDistanceToNow } from "date-fns";

import { TrackDto } from "../../generated/haly";

export function TrackDateAddedCell(ctx: CellContext<TrackDto, unknown>) {
    return formatAddedAt(ctx.row.original.addedAt);
}

export const TrackDateAddedHeader = "date added";

function formatAddedAt(addedAtIso: Date) {
    const addedAt = new Date(addedAtIso);
    const diffInMonths = differenceInMonths(new Date(), addedAt);

    return diffInMonths > 0 ? format(addedAt, "MMM d, y") : formatDistanceToNow(addedAt, { addSuffix: true });
}
