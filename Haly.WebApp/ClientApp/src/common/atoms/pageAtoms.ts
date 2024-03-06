import { atom } from "jotai";

import { AlbumDetailedDto, ArtistDetailedDto, PlaylistWithTracksDto, UserProfileDto } from "../../../generated/haly";
import { theme } from "../theme";
import { userIdAtom } from "./userAtoms";

export type PageContext =
    | {
          type: "playlist";
          data: PlaylistWithTracksDto;
          // Is changing name, description or adding/removing tracks allowed.
          isEditable: boolean;
      }
    | {
          type: "collection";
          data: PlaylistWithTracksDto;
      }
    | {
          type: "album";
          data: AlbumDetailedDto;
      }
    | {
          type: "artist";
          data: ArtistDetailedDto;
      }
    | {
          type: "user";
          data: UserProfileDto;
      }
    | {
          type: "basic";
          data: {
              id: string;
              name: string;
          };
      };

export const pageContextAtom = atom<PageContext | null>(null);

export const pageContextIdAtom = atom((get) => get(pageContextAtom)?.data.id);
export const pageContextUriAtom = atom((get) => {
    const pageContext = get(pageContextAtom);
    if (!pageContext || pageContext.type === "basic") return "";

    if (pageContext.type === "collection") {
        const userId = get(userIdAtom);
        return `spotify:user:${userId}:collection`;
    }

    return `spotify:${pageContext.type}:${pageContext.data.id}`;
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
export const lastArtistNameAtom = atom<string | null>(null);

export const dominantColorsAtom = atom<Record<string, string>>({});
export const pageDominantColorAtom = atom((get) => {
    const pageContext = get(pageContextAtom);
    if (!pageContext) return null;

    if (pageContext.type === "collection" || pageContext.type === "basic") return theme.colors.dominantPurple;

    const imageUrl = pageContext.data.imageUrl;
    if (!imageUrl) return theme.colors.dominantDefault;

    const dominantColors = get(dominantColorsAtom);
    return dominantColors[imageUrl];
});
