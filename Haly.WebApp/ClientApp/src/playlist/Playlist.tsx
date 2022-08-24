import { differenceInMonths, format, formatDistanceToNow } from "date-fns";
import { useEffect, useState } from "react";
import { useAuth } from "react-oidc-context";
import { useParams } from "react-router-dom";

import { styled } from "../common/theme";

export type PlaylistDto = {
    id: string;
    name: string;
    tracks: {
        id: string;
        name: string;
        duration: string;
        addedAt: string;
        album: {
            id: string;
            name: string;
            artists: { id: string; name: string }[];
        };
        artists: { id: string; name: string }[];
    }[];
};

function Playlist() {
    const { user } = useAuth();
    const { id: playlistId } = useParams();
    const [playlist, setPlaylist] = useState<PlaylistDto>();

    useEffect(() => {
        async function fetchPlaylists() {
            try {
                const resp = await fetch(`${import.meta.env.VITE_API_ORIGIN}/playlists/${playlistId}`, {
                    headers: { "x-spotify-token": user!.access_token! },
                });
                if (resp.ok) {
                    console.log(resp.statusText);
                    setPlaylist(await resp.json());
                }
            } catch (e) {
                console.error(e);
            }
        }

        fetchPlaylists();
    }, [playlistId, user]);

    function formatAddedAt(addedAtIso: string) {
        const addedAt = new Date(addedAtIso);
        const diffInMonths = differenceInMonths(new Date(), addedAt);

        return diffInMonths > 0 ? format(addedAt, "MMM d, y") : formatDistanceToNow(addedAt, { addSuffix: true });
    }

    if (!playlist) {
        return null;
    }

    return (
        <main>
            <h1>{playlist.name}</h1>
            <Tracklist>
                {playlist.tracks.map((item) => {
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
        </main>
    );
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

export default Playlist;
