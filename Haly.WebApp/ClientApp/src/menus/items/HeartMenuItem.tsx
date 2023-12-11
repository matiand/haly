import { MenuItem } from "@szhsin/react-menu";
import { useSetAtom } from "jotai";

import { modalAtom, RemoveFromLibraryModalProps } from "../../common/atoms/modalAtoms";
import useHeartMutations, { HeartMutationParams } from "../../common/useHeartMutations";

type HeartMenuItemProps = {
    params: HeartMutationParams;
    isInLibrary: boolean;
    confirmationModalProps?: Omit<RemoveFromLibraryModalProps, "onAccept">;
};

function HeartMenuItem({ params, isInLibrary, confirmationModalProps }: HeartMenuItemProps) {
    const setModal = useSetAtom(modalAtom);

    const { follow, unfollow } = useHeartMutations();

    const action = isInLibrary ? () => unfollow.mutate(params) : () => follow.mutate(params);
    const onClick = () => {
        if (isInLibrary && confirmationModalProps) {
            setModal({
                type: "removeFromLibrary",
                props: {
                    ...confirmationModalProps,
                    onAccept: action,
                },
            });
        } else {
            action();
        }
    };

    const name = getMenuItemName(params, isInLibrary, confirmationModalProps?.isOwnedByCurrentUser);

    return (
        <MenuItem style={{ minWidth: "max-content" }} onClick={onClick}>
            {name}
        </MenuItem>
    );
}

function getMenuItemName(params: HeartMenuItemProps["params"], isInLibrary: boolean, isOwnedByCurrentUser?: boolean) {
    if (isOwnedByCurrentUser) {
        return "Delete";
    }

    if (isInLibrary) {
        return params.type === "track" ? "Remove from your Liked Songs" : "Remove from Your Library";
    }

    return params.type === "track" ? "Save to your Liked Songs" : "Add to Your Library";
}

export default HeartMenuItem;
