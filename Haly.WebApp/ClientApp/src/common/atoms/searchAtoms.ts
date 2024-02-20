import { atom } from "jotai";

export const searchQueryAtom = atom<string>("");

export type SearchOption = "all" | "artists" | "albums" | "playlists" | "songs" | "library";
export const searchOptionAtom = atom<SearchOption>("all");
