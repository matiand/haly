import { differenceInMonths, format, formatDistanceToNowStrict } from "date-fns";

import { PlaylistTrackDto } from "../../generated/haly";
import { styled } from "../common/theme";

type TrackDateAddedCellProps = {
    track: PlaylistTrackDto;
};

function TrackDateAddedCell({ track }: TrackDateAddedCellProps) {
    return <Wrapper>{formatAddedAt(track.addedAt)}</Wrapper>;
}

function formatAddedAt(addedAtIso: Date) {
    const addedAt = new Date(addedAtIso);
    const diffInMonths = differenceInMonths(new Date(), addedAt);

    return diffInMonths > 0 ? format(addedAt, "MMM d, y") : formatDistanceToNowStrict(addedAt, { addSuffix: true });
}

const Wrapper = styled("div", {
    color: "$white400",
    fontSize: "$300",
    fontWeight: 500,
});

export default TrackDateAddedCell;
