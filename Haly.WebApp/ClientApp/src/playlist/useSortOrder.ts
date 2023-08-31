import { atom, useAtom } from "jotai";
import { useEffect } from "react";

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

const globalSortOrderStoreKey = "playlist:globalSortOrder";

const sortOrderByPlaylistId = atom<Record<string, PlaylistSortOrder>>({});

export function usePersistedSortOrder(playlistId: string) {
    const storeKey = `playlist:${playlistId}:sortOrder`;

    const [sortOrders, setSortOrders] = useAtom(sortOrderByPlaylistId);
    const globalSortOrder = localStorage.getItem(globalSortOrderStoreKey);
    const savedSortOrder = localStorage.getItem(storeKey);

    const sortOrder = sortOrders[playlistId] ?? savedSortOrder ?? globalSortOrder ?? "";

    const setter = (newValue: PlaylistSortOrder) => {
        setSortOrders((prev) => ({ ...prev, [playlistId]: newValue }));
        localStorage.setItem(storeKey, newValue);
    };

    useEffect(() => {
        const savedValue = localStorage.getItem(storeKey) ?? globalSortOrder;
        setSortOrders((prev) => ({ ...prev, [playlistId]: savedValue as PlaylistSortOrder }));
    }, [playlistId, storeKey, globalSortOrder, setSortOrders]);

    return [sortOrder, setter] as [PlaylistSortOrder, typeof setter];
}

export function useGlobalSortOrder() {
    const globalSortOrder = localStorage.getItem(globalSortOrderStoreKey) ?? "";
    const setter = (newValue: PlaylistSortOrder) => localStorage.setItem(globalSortOrderStoreKey, newValue);

    return [globalSortOrder, setter] as [PlaylistSortOrder, typeof setter];
}
