import { useState } from "react";

import { ArtistTopTrackDto } from "../../generated/haly";
import { styled } from "../common/theme";
import * as Table from "./Table";
import TopTracksTableRow from "./TopTracksTableRow";

type TopTracksTableProps = {
    items: ArtistTopTrackDto[];
};

function TopTracksTable({ items }: TopTracksTableProps) {
    const [showMore, setShowMore] = useState(false);

    const showButton = items.length > 5;
    const btnLabel = showMore ? "Show less" : "See more";

    return (
        <div>
            <TableRoot>
                <Table.Body>
                    {items.slice(0, showMore ? 10 : 5).map((t, idx) => (
                        <TopTracksTableRow key={t.spotifyId} index={idx + 1} track={t} />
                    ))}
                </Table.Body>
            </TableRoot>

            {showButton && <Button onClick={() => setShowMore((prev) => !prev)}>{btnLabel}</Button>}
        </div>
    );
}

const Button = styled("button", {
    background: "transparent",
    border: "none",
    color: "$white500",
    fontSize: "$200",
    fontWeight: 700,
    padding: "$600",

    "&:hover": {
        color: "$white800",
    },
});

const TableRoot = styled(Table.Root, {
    "& > tbody": {
        tr: {
            gridGap: "$600",
            gridTemplateColumns: "16px 4fr minmax(120px, 1fr)",
        },
    },

    "& td:last-of-type": {
        justifySelf: "end",
    },
});

export default TopTracksTable;
