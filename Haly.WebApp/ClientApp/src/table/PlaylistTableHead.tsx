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
        </Table.Head>
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
