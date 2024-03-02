import { atom } from "jotai";

export type NewReleasesFilter = "all" | "albums" | "singles";

export const artistsLeftAtom = atom(0);
