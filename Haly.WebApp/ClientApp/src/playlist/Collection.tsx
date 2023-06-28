import { useInView } from "react-intersection-observer";

import { styled, theme } from "../common/theme";
import { TrackDto } from "../halyClient";
import useTrackCollection from "./useTrackCollection";

type CollectionProps = {
    items: TrackDto[];
};

function Collection({ items }: CollectionProps) {
    const { table, renderHeaderCell, renderRowCell } = useTrackCollection(items);
    const { ref, inView } = useInView();

    if (items.length === 0) return null;

    return (
        <>
            <div ref={ref} aria-hidden></div>
            <Table>
                <THead className={inView ? "" : "sticky-head"}>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map((cell) => (
                                <th key={cell.id}>{renderHeaderCell(cell)}</th>
                            ))}
                        </tr>
                    ))}
                </THead>

                <TBody>
                    {table.getRowModel().rows.map((row) => (
                        <tr key={row.id}>
                            {row.getVisibleCells().map((cell) => (
                                <td key={cell.id}>{renderRowCell(cell)}</td>
                            ))}
                        </tr>
                    ))}
                </TBody>
            </Table>
        </>
    );
}

const Table = styled("table", {
    display: "block",
    userSelect: "none",

    "& th, td": {
        padding: 0,
    },
});

const THead = styled("thead", {
    background: "",
    display: "block",
    position: "sticky",
    top: `${theme.sizes.userMenuHeight}`,
    zIndex: "$collectionHead",
    margin: "0 -$700 $600",
    padding: "0 $700",

    "&.sticky-head": {
        background: "$black500",
        borderBottom: "1px solid $collectionHeadBorder",
        boxShadow: "0 -1px 0 0 $collectionHead",

        "& > tr": {
            borderBottom: "none",
        },
    },

    "& > tr": {
        borderBottom: "1px solid $collectionHeadBorder",
        display: "grid",
        gridGap: "$600",
        gridTemplateColumns: "16px 4fr 2fr minmax(120px, 1fr)",
        height: "36px",
        padding: "0 $600",

        "& > th": {
            alignItems: "center",
            color: "$white700",
            display: "flex",
            fontSize: "$300",
            fontWeight: "500",
        },

        "& > th:nth-of-type(1), & > th:nth-of-type(5)": {
            justifySelf: "end",
        },

        "& > th:nth-of-type(4)": {
            display: "none",
        },

        "& > th:last-of-type": {
            marginRight: "$800",
        },

        "@bp3": {
            gridTemplateColumns: "16px 6fr 4fr 3fr minmax(120px, 1fr)",

            "& > th:nth-of-type(4)": {
                display: "flex",
            },
        },
    },
});

const TBody = styled("tbody", {
    display: "block",

    "& > tr": {
        display: "grid",
        gridGap: "$600",
        gridTemplateColumns: "16px 4fr 2fr minmax(120px, 1fr)",
        height: "56px",
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

        "& > td:nth-of-type(5)": {
            justifySelf: "end",
            fontWeight: 500,
        },

        "@bp3": {
            gridTemplateColumns: "16px 6fr 4fr 3fr minmax(120px, 1fr)",

            "& >td:nth-of-type(4)": {
                display: "flex",
            },
        },
    },
});

export default Collection;
