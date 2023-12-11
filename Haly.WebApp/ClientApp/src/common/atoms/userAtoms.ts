import { atom } from "jotai";

import { PrivateUserDto } from "../../../generated/haly";

export const userAtom = atom<PrivateUserDto | null>(null);
export const userIdAtom = atom<string>((get) => get(userAtom)?.id ?? "");
export const userNameAtom = atom<string>((get) => get(userAtom)?.name ?? "");

export const userCanStreamTracksAtom = atom<boolean>((get) => get(userAtom)?.canStreamTracks ?? false);
export const userLikedSongsCollectionIdAtom = atom((get) => get(userAtom)?.likedSongsCollectionId);
