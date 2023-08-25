import { useAtom, useAtomValue } from "jotai";
import { ReactNode } from "react";
import { GoTriangleDown, GoTriangleUp } from "react-icons/go";

import { PlaylistSortOrder, playlistSortOrderAtom } from "../common/atoms";
import { styled } from "../common/theme";
import * as Table from "./Table";
import TrackDurationIcon from "./TrackDurationIcon";

type PlaylistTableHeadProps = {
    hasPodcasts: boolean;
};

export function PlaylistTableHead({ hasPodcasts }: PlaylistTableHeadProps) {
    const sortOrder = useAtomValue(playlistSortOrderAtom);

    return (
        <Table.Head>
            <tr>
                <th>#</th>

                <SortableHeadCell sortOrderSlice={["none", "title", "title_desc", "artist", "artist_desc"]}>
                    {sortOrder === "artist" || sortOrder === "artist_desc" ? "Artist" : "Title"}
                </SortableHeadCell>

                <SortableHeadCell sortOrderSlice={["none", "album", "album_desc"]}>
                    {hasPodcasts ? "Album or podcast" : "Album"}
                </SortableHeadCell>

                <SortableHeadCell sortOrderSlice={["none", "added_at", "added_at_desc"]}>Date added</SortableHeadCell>

                <SortableHeadCell sortOrderSlice={["none", "duration", "duration_desc"]}>
                    <TrackDurationIcon />
                </SortableHeadCell>
            </tr>
        </Table.Head>
    );
}

type PlaylistTableHeadRowProps = {
    children: ReactNode;
    sortOrderSlice: PlaylistSortOrder[];
};

function SortableHeadCell({ children, sortOrderSlice }: PlaylistTableHeadRowProps) {
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

    const isActive = currOrderIndex > 0;
    const isAscending = isActive && currOrderIndex % 2 === 1;
    const isDescending = isActive && currOrderIndex % 2 === 0;

    // It's important for value to be undefined when no ordering is in use
    const ariaSortValue = isAscending ? "ascending" : isDescending ? "descending" : undefined;

    return (
        <SortableTh aria-sort={ariaSortValue}>
            <button type="button" onClick={onClick}>
                {children}

                {isAscending && (
                    <span aria-hidden>
                        <GoTriangleUp />
                    </span>
                )}
                {isDescending && (
                    <span aria-hidden>
                        <GoTriangleDown />
                    </span>
                )}
            </button>
        </SortableTh>
    );
}

const SortableTh = styled("th", {
    gap: "$400",

    button: {
        background: "none",
        border: 0,
        padding: 0,

        "& > span > svg": {
            $$size: "16px",

            color: "$primary300",
            height: "$$size",
            marginLeft: "$400",
            width: "$$size",
        },

        "&:hover": {
            color: "$white800",
        },
    },
});
