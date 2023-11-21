import { atom } from "jotai";

import { theme } from "../theme";
import { userIdAtom } from "./userAtoms";

export type PageContext = {
    id: string;
    title: string;
    type: "playlist" | "album" | "user" | "artist";
    // Needed for accessing its dominant color.
    imageUrl?: string | null;
};

export const pageContextAtom = atom<PageContext | null>(null);
export const pageContextIdAtom = atom((get) => get(pageContextAtom)?.id);
export const pageContextUriAtom = atom((get) => {
    // I'm using PageContext, because it's always available on relevant pages, unlike PlaybackContext.
    const pageContext = get(pageContextAtom);
    if (!pageContext) return "";

    const userId = get(userIdAtom);
    if (pageContext.type === "user") return `spotify:user:${userId}:collection`;

    return `spotify:${pageContext.type}:${pageContext.id}`;
});

const sidebarWidthAtom = atom<number>(+localStorage.getItem("sidebarWidth")! || theme.sidebar.defaultWidth);
export const persistedSidebarWidthAtom = atom(
    (get) => get(sidebarWidthAtom),
    (_, set, newValue: number) => {
        set(sidebarWidthAtom, newValue);
        localStorage.setItem("sidebarWidth", newValue.toString());
    },
);

export const pageHeaderVisibilityAtom = atom<number>(1);
export const dominantColorsAtom = atom<Record<string, string | undefined>>({
    "": theme.colors.dominantDefault,
});

export const artistNameAtom = atom<string | null>(null);
