import { atom } from "jotai";

import { DuplicateProblem, DuplicatesStrategy } from "../../../generated/haly";

export type RemoveFromLibraryModalProps = {
    id: string;
    name: string;
    isOwnedByCurrentUser: boolean;
    onAccept: () => void;
};

type ModalVariant =
    | {
          type: "removeFromLibrary";
          props: RemoveFromLibraryModalProps;
      }
    | {
          type: "editPlaylistDetails";
          props: {
              id: string;
              name: string;
              description: string;
          };
      }
    | {
          type: "duplicateTracksProblem";
          props: {
              problem: DuplicateProblem;
              onAccept: (strategy: DuplicatesStrategy) => void;
              onCancel: () => void;
          };
      }
    | {
          type: "displayAlbumArtwork";
          props: {
              imageUrl: string;
          };
      };

export const modalAtom = atom<ModalVariant | null>(null);
