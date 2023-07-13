import { differenceInMonths, format, formatDistanceToNowStrict } from "date-fns";

import { PlaylistTrackDto } from "../../generated/haly";

type TrackDateAddedCellProps = {
    track: PlaylistTrackDto;
};

function TrackDateAddedCell({ track }: TrackDateAddedCellProps) {
    return <div>{formatAddedAt(track.addedAt)}</div>;
}

function formatAddedAt(addedAtIso: Date) {
    const addedAt = new Date(addedAtIso);
    const diffInMonths = differenceInMonths(new Date(), addedAt);

    return diffInMonths > 0 ? format(addedAt, "MMM d, y") : formatDistanceToNowStrict(addedAt, { addSuffix: true });
}

export default TrackDateAddedCell;
