import { differenceInDays, differenceInWeeks, format, formatDistanceToNowStrict } from "date-fns";

import { PlaylistTrackDto } from "../../generated/haly";
import { pluralize } from "../common/pluralize";
import { styled } from "../common/theme";

type TrackDateAddedCellProps = {
    track: PlaylistTrackDto;
};

function TrackDateAddedCell({ track }: TrackDateAddedCellProps) {
    return <Wrapper>{formatAddedAt(track.addedAt)}</Wrapper>;
}

function formatAddedAt(addedAtIso: Date) {
    const diffInDays = differenceInDays(new Date(), addedAtIso);
    const diffInWeeks = differenceInWeeks(new Date(), addedAtIso, { roundingMethod: "round" });

    if (diffInDays >= 7 && diffInDays < 30) {
        return `${pluralize("week", diffInWeeks)} ago`;
    }

    return diffInDays >= 30
        ? format(addedAtIso, "MMM d, y")
        : formatDistanceToNowStrict(addedAtIso, { addSuffix: true });
}

const Wrapper = styled("div", {
    color: "$white400",
    fontSize: "$300",
    fontWeight: 500,
});

export default TrackDateAddedCell;
