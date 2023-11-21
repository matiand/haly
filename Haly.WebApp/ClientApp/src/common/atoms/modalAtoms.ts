import { atom } from "jotai";

import { DuplicateProblem, DuplicatesStrategy } from "../../../generated/haly";

type ModalVariant =
    | {
          type: "removeFromLibrary";
          props: {
              isOwnedByCurrentUser: boolean;
              entityName: string;
              onAccept: () => void;
          };
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
      };

export const modalAtom = atom<ModalVariant | null>(null);
