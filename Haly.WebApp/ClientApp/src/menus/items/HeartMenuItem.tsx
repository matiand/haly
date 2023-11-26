import { MenuItem } from "@szhsin/react-menu";
import { useSetAtom } from "jotai";
import { useNavigate, useParams } from "react-router-dom";

import { modalAtom } from "../../common/atoms/modalAtoms";
import useHeartMutations, { HeartMutationParams } from "../../common/useHeartMutations";

type HeartMenuItemProps = {
    params: HeartMutationParams;
    isInLibrary: boolean;
    isOwnedByCurrentUser?: boolean;
    entityName?: string;
};

function HeartMenuItem({ params, isInLibrary, isOwnedByCurrentUser, entityName }: HeartMenuItemProps) {
    const { id: routeId } = useParams();
    const navigate = useNavigate();
    const setModal = useSetAtom(modalAtom);

    const { follow, unfollow } = useHeartMutations();

    const action = isInLibrary ? () => unfollow.mutate(params) : () => follow.mutate(params);
    const onClick = () => {
        const needsConfirmation = params.type === "playlist" && isInLibrary;
        if (needsConfirmation) {
            setModal({
                type: "removeFromLibrary",
                props: {
                    isOwnedByCurrentUser: isOwnedByCurrentUser ?? false,
                    entityName: entityName ?? "",
                    onAccept: () => {
                        action();

                        if (isOwnedByCurrentUser && params.type === "playlist" && params.id === routeId) {
                            navigate("/");
                        }
                    },
                },
            });
        } else {
            action();
        }
    };

    const name = getMenuItemName(params, isInLibrary, isOwnedByCurrentUser);

    return (
        <MenuItem style={{ minWidth: "max-content" }} onClick={onClick}>
            {name}
        </MenuItem>
    );
}

function getMenuItemName(params: HeartMenuItemProps["params"], isInLibrary: boolean, isCurrentUserPlaylist?: boolean) {
    if (isCurrentUserPlaylist) {
        return "Delete";
    }

    if (isInLibrary) {
        return params.type === "track" ? "Remove from your Liked Songs" : "Remove from Your Library";
    }
    return params.type === "track" ? "Save to your Liked Songs" : "Add to Your Library";
}

export default HeartMenuItem;
