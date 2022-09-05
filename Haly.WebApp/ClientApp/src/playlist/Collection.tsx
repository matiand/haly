import { differenceInMonths, format, formatDistanceToNow } from "date-fns";

import { styled } from "../common/theme";
import { TrackDto } from "../halyClient";

type CollectionProps = {
    items: TrackDto[];
};

function Collection({ items }: CollectionProps) {
    return (
        <Tracklist>
            {items.map((item) => {
                const { id, name, duration, album, artists, addedAt } = item;
                const artistLine = artists.map((artist) => artist.name).join(", ");

                return (
                    <Track key={id}>
                        <div>
                            <div>{name}</div>
                            <span>{artistLine}</span>
                        </div>
                        <div>{album.name}</div>
                        <div>{duration}</div>
                        <div>{formatAddedAt(addedAt)}</div>
                    </Track>
                );
            })}
        </Tracklist>
    );
}

function formatAddedAt(addedAtIso: Date) {
    const addedAt = new Date(addedAtIso);
    const diffInMonths = differenceInMonths(new Date(), addedAt);

    return diffInMonths > 0 ? format(addedAt, "MMM d, y") : formatDistanceToNow(addedAt, { addSuffix: true });
}

const Tracklist = styled("ul", {
    padding: 0,
});

const Track = styled("li", {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",

    "& > div": {
        marginRight: "$600",
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
        marginBottom: "$400",

        "&:nth-of-type(1)": {
            width: "400px",
        },
        "&:nth-of-type(2)": {
            width: "300px",
        },
        "&:nth-of-type(3)": {
            width: "80px",
        },
    },
    span: {
        fontSize: "$200",
    },
});

export default Collection;
