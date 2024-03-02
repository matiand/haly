import { differenceInDays, differenceInWeeks, format, formatDistanceToNowStrict } from "date-fns";

import { pluralize } from "../common/pluralize";
import { styled } from "../common/theme";

type DateCellProps = {
    date: Date;
};

function DateCell({ date }: DateCellProps) {
    return <Wrapper>{formatDate(date)}</Wrapper>;
}

function formatDate(date: Date) {
    const diffInDays = differenceInDays(new Date(), date);
    const diffInWeeks = differenceInWeeks(new Date(), date, { roundingMethod: "round" });

    if (diffInDays >= 7 && diffInDays < 30) {
        return `${pluralize("week", diffInWeeks)} ago`;
    }

    return diffInDays >= 30 ? format(date, "MMM d, y") : formatDistanceToNowStrict(date, { addSuffix: true });
}

const Wrapper = styled("div", {
    color: "$white400",
    fontSize: "$300",
    fontWeight: 500,
});

export default DateCell;
