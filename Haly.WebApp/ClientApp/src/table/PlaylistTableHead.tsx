import { useAtom, useAtomValue } from "jotai";
import { ReactNode } from "react";
import { GoTriangleDown, GoTriangleUp } from "react-icons/go";

import { PlaylistSortOrder, playlistSortOrderAtom } from "../common/atoms";
import { styled, theme } from "../common/theme";
import TrackDurationIcon from "./TrackDurationIcon";

type PlaylistTableHeadProps = {
    isSticky: boolean;
    hasPodcasts: boolean;
};

export function PlaylistTableHead({ isSticky, hasPodcasts }: PlaylistTableHeadProps) {
    const sortOrder = useAtomValue(playlistSortOrderAtom);

    return (
        <THead className={isSticky ? "sticky-head" : ""}>
            <tr>
                <th>#</th>

                <PlaylistTableHeadRow sortOrderSlice={["none", "title", "title_desc", "artist", "artist_desc"]}>
                    {sortOrder === "artist" || sortOrder === "artist_desc" ? "Artist" : "Title"}
                </PlaylistTableHeadRow>

                <PlaylistTableHeadRow sortOrderSlice={["none", "album", "album_desc"]}>
                    {hasPodcasts ? "Album or podcast" : "Album"}
                </PlaylistTableHeadRow>

                <PlaylistTableHeadRow sortOrderSlice={["none", "added_at", "added_at_desc"]}>
                    Date added
                </PlaylistTableHeadRow>

                <PlaylistTableHeadRow sortOrderSlice={["none", "duration", "duration_desc"]}>
                    <TrackDurationIcon />
                </PlaylistTableHeadRow>
            </tr>
        </THead>
    );
}

type PlaylistTableHeadRowProps = {
    children: ReactNode;
    sortOrderSlice: PlaylistSortOrder[];
};

function PlaylistTableHeadRow({ children, sortOrderSlice }: PlaylistTableHeadRowProps) {
    const [sortOrder, setSortOrder] = useAtom(playlistSortOrderAtom);
    const currOrderIndex = sortOrderSlice.findIndex((val) => val === sortOrder);

    const onClick = () => {
        if (currOrderIndex === -1) {
            setSortOrder(sortOrderSlice[1]);
        } else if (currOrderIndex + 1 === sortOrderSlice.length) {
            setSortOrder(sortOrderSlice[0]);
        } else {
            setSortOrder(sortOrderSlice[currOrderIndex + 1]);
        }
    };

    return (
        <SortableTh onClick={onClick}>
            {children}

            {currOrderIndex > 0 && (
                <span aria-hidden>{currOrderIndex % 2 === 1 ? <GoTriangleUp /> : <GoTriangleDown />}</span>
            )}
        </SortableTh>
    );
}

const THead = styled("thead", {
    background: "",
    display: "block",
    position: "sticky",
    top: `${theme.sizes.upperMenuHeight}`,
    zIndex: "$collectionTableHead",
    margin: "0 -$700 $600",
    padding: "0 $700",

    "&.sticky-head": {
        background: "$black500",
        borderBottom: "1px solid $collectionTableHeadBorder",
        boxShadow: "0 -1px 0 0 $collectionTableStickyHead",

        "& > tr": {
            borderBottom: "none",
        },
    },

    "& > tr": {
        borderBottom: "1px solid $collectionTableHeadBorder",
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
            flexFlow: "row-reverse",
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

const SortableTh = styled("th", {
    gap: "$400",

    "&:hover": {
        color: "$white800",
    },

    "& > span > svg": {
        $$size: "16px",

        color: "$primary300",
        height: "$$size",
        width: "$$size",
    },
});
