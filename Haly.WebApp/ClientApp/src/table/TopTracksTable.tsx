import { useState } from "react";

import { ArtistTopTrackDto } from "../../generated/haly";
import { styled, theme } from "../common/theme";
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
            <Table>
                <TBody>
                    {items.slice(0, showMore ? 10 : 5).map((t, idx) => (
                        <TopTracksTableRow key={t.spotifyId} index={idx + 1} track={t} />
                    ))}
                </TBody>
            </Table>

            {showButton && <Button onClick={() => setShowMore((prev) => !prev)}>{btnLabel}</Button>}
        </div>
    );
}

const gridTemplateColumns = "16px 4fr minmax(120px, 1fr)";

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

const Table = styled("table", {
    display: "block",
    userSelect: "none",

    "& th, td": {
        padding: 0,
    },
});

const TBody = styled("tbody", {
    $$rowHeight: `${theme.tables.rowHeight}px`,

    display: "block",

    "& > tr": {
        display: "grid",
        gridGap: "$600",
        gridTemplateColumns,
        height: "$$rowHeight",
        padding: "0 $600",

        "& > td": {
            alignItems: "center",
            display: "flex",

            "& button": {
                opacity: 0,
            },
        },

        "&:hover": {
            background: "$trackHover",
            borderRadius: "4px",
            "& td:nth-of-type(1) > div > span": {
                display: "none",
            },

            "& a": {
                color: "$white800",
            },

            "& button": {
                opacity: 1,
            },
        },

        "&[data-playable=false] > td": {
            opacity: 0.4,
        },

        "& > td:nth-of-type(1)": {
            color: "$white500",
            fontSize: "$300",
            fontWeight: 500,
            justifySelf: "center",
        },

        "& > td:nth-of-type(2)": {
            color: "$white500",
            fontSize: "$300",
        },

        "& > td:nth-of-type(4)": {
            color: "$white400",
            display: "none",
            fontSize: "$300",
            fontWeight: 500,
        },

        "& > td:last-of-type": {
            color: "$white400",
            justifySelf: "end",
            fontWeight: 500,
        },
    },
});

export default TopTracksTable;
