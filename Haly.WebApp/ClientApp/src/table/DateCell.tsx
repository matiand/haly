import { styled } from "../common/theme";
import formatDateCell from "./formatDateCell";

type DateCellProps = {
    date: Date;
};

function DateCell({ date }: DateCellProps) {
    return <Wrapper>{formatDateCell(date)}</Wrapper>;
}

const Wrapper = styled("div", {
    color: "$white400",
    fontSize: "$300",
    fontWeight: 500,
});

export default DateCell;
