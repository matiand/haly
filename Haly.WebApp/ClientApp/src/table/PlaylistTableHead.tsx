import { ReactNode } from "react";
import { GoTriangleDown, GoTriangleUp } from "react-icons/go";
import { useParams } from "react-router-dom";

import { styled } from "../common/theme";
import { PlaylistSortOrder, usePersistedSortOrder } from "../playlist/useSortOrder";
import * as Table from "./Table";
import TrackDurationIcon from "./TrackDurationIcon";

type PlaylistTableHeadProps = {
    hasPodcasts: boolean;
};

export function PlaylistTableHead({ hasPodcasts }: PlaylistTableHeadProps) {
    const { id: playlistId } = useParams();
    const [sortOrder, setSortOrder] = usePersistedSortOrder(playlistId!);

    return (
        <Table.Head>
            <tr>
                <th>#</th>

                <SortableHeadCell
                    options={["", "title", "title_desc", "artist", "artist_desc"]}
                    activeOption={sortOrder}
                    onOptionChange={setSortOrder}
                >
                    {sortOrder === "artist" || sortOrder === "artist_desc" ? "Artist" : "Title"}
                </SortableHeadCell>

                <SortableHeadCell
                    options={["", "album", "album_desc"]}
                    activeOption={sortOrder}
                    onOptionChange={setSortOrder}
                >
                    {hasPodcasts ? "Album or podcast" : "Album"}
                </SortableHeadCell>

                <SortableHeadCell
                    options={["", "added_at", "added_at_desc"]}
                    activeOption={sortOrder}
                    onOptionChange={setSortOrder}
                >
                    Date added
                </SortableHeadCell>

                <SortableHeadCell
                    options={["", "duration", "duration_desc"]}
                    activeOption={sortOrder}
                    onOptionChange={setSortOrder}
                >
                    <TrackDurationIcon />
                </SortableHeadCell>
            </tr>
        </Table.Head>
    );
}

type PlaylistTableHeadRowProps = {
    children: ReactNode;
    options: PlaylistSortOrder[];
    activeOption: PlaylistSortOrder;
    onOptionChange: (newOption: PlaylistSortOrder) => void;
};

function SortableHeadCell({ children, options, activeOption, onOptionChange }: PlaylistTableHeadRowProps) {
    const currOrderIndex = options.findIndex((val) => val === activeOption);

    const onClick = () => {
        if (currOrderIndex === -1) {
            onOptionChange(options[1]);
        } else if (currOrderIndex + 1 === options.length) {
            onOptionChange(options[0]);
        } else {
            onOptionChange(options[currOrderIndex + 1]);
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
