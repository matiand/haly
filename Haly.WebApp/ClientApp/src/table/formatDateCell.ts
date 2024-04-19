import { differenceInDays, differenceInWeeks, format, formatDistanceToNowStrict } from "date-fns";

import { pluralize } from "../common/pluralize";

function formatDateCell(date: Date) {
    const diffInDays = differenceInDays(new Date(), date);
    const diffInWeeks = differenceInWeeks(new Date(), date, { roundingMethod: "round" });

    if (diffInDays >= 7 && diffInDays < 30) {
        return `${pluralize("week", diffInWeeks)} ago`;
    }

    return diffInDays >= 30 ? format(date, "MMM d, y") : formatDistanceToNowStrict(date, { addSuffix: true });
}

export default formatDateCell;
