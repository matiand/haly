import { atom, useAtom } from "jotai";
import { useMemo } from "react";

export type PlaylistSortOrder =
    | ""
    | "title"
    | "title_desc"
    | "artist"
    | "artist_desc"
    | "album"
    | "album_desc"
    | "added_at"
    | "added_at_desc"
    | "duration"
    | "duration_desc";

type PlaylistSordOrderById = {
    global: PlaylistSortOrder;
    [id: string]: PlaylistSortOrder;
};
const storeKey = "playlist:sortOrders";

function getInitialSortOrders(): PlaylistSordOrderById {
    const text = localStorage.getItem(storeKey);

    if (!text) return { global: "" };

    return JSON.parse(text);
}

const playlistSortOrderByIdAtom = atom<PlaylistSordOrderById>(getInitialSortOrders());

const persistedPlaylistSortOrderById = atom(
    (get) => get(playlistSortOrderByIdAtom),
    (get, set, playlistId: string, val: PlaylistSortOrder) => {
        // Reset dictionary when global sort order is changed.
        if (playlistId === "global") {
            const newDict = {
                global: val,
            };
            set(playlistSortOrderByIdAtom, newDict);
            localStorage.setItem(storeKey, JSON.stringify(newDict));
            return;
        }

        const old = get(playlistSortOrderByIdAtom);
        const newDict = {
            ...old,
            [playlistId]: val,
        };

        set(playlistSortOrderByIdAtom, newDict);
        localStorage.setItem(storeKey, JSON.stringify(newDict));
    },
);

export function usePlaylistSortOrder(playlistId: string, isLikedSongsCollection: boolean) {
    const [sortOrderById, setter] = useAtom(persistedPlaylistSortOrderById);
    const idToUse = isLikedSongsCollection ? "likes" : playlistId;

    const sortOrder = useMemo(() => {
        if (isLikedSongsCollection) return sortOrderById[idToUse] ?? ("added_at_desc" as PlaylistSortOrder);

        return sortOrderById[idToUse] ?? sortOrderById.global;
    }, [sortOrderById, idToUse, isLikedSongsCollection]);

    return {
        sortOrder,
        setSortOrder: (newValue: PlaylistSortOrder) => setter(idToUse, newValue),
    };
}

export function useGlobalSortOrder() {
    const [sortOrderById, setter] = useAtom(persistedPlaylistSortOrderById);

    return {
        globalSortOrder: sortOrderById.global,
        setGlobalSortOrder: (newValue: PlaylistSortOrder) => setter("global", newValue),
    };
}
