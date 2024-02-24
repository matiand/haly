import { atom } from "jotai";

import { PrivateUserDto } from "../../../generated/haly";

export const userAtom = atom<PrivateUserDto | null>(null);
export const userIdAtom = atom<string>((get) => get(userAtom)?.id ?? "");
export const userNameAtom = atom<string>((get) => get(userAtom)?.name ?? "");

export const userIsAllowedPlaybackAtom = atom<boolean>((get) => get(userAtom)?.isPlaybackAllowed ?? false);
