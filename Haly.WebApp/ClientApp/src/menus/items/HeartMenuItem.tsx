import { MenuItem } from "@szhsin/react-menu";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { styled } from "../../common/theme";
import useHeartMutations, { HeartMutationParams } from "../../common/useHeartMutations";
import Modal from "../../ui/Modal";

type HeartMenuItemProps = {
    params: HeartMutationParams;
    isInLibrary: boolean;
    isOwnedByCurrentUser?: boolean;
    entityName?: string;
};

function HeartMenuItem({ params, isInLibrary, isOwnedByCurrentUser, entityName }: HeartMenuItemProps) {
    const { id: routeId } = useParams();
    const navigate = useNavigate();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const { follow, unfollow } = useHeartMutations();

    const action = isInLibrary ? () => unfollow.mutate(params) : () => follow.mutate(params);
    const onClick = () => {
        const needsConfirmation = params.type === "playlist" && isInLibrary;
        if (needsConfirmation) {
            setIsModalOpen(true);
        } else {
            action();
        }
    };

    const name = getMenuItemName(params, isInLibrary, isOwnedByCurrentUser);

    return (
        <>
            <MenuItem onClick={onClick}>{name}</MenuItem>

            {isModalOpen && (
                <Modal
                    title={`${isOwnedByCurrentUser ? "Delete" : "Remove"} from Your Library?`}
                    renderDescription={() => (
                        <p>
                            This will {isOwnedByCurrentUser ? "delete" : "remove"} <b>{entityName}</b> from{" "}
                            <b>Your Library.</b>
                        </p>
                    )}
                    onClose={() => setIsModalOpen(false)}
                >
                    <ModalContents>
                        <button type="button" onClick={() => setIsModalOpen(false)}>
                            Cancel
                        </button>
                        <button
                            type="button"
                            onClick={() => {
                                setIsModalOpen(false);
                                action();

                                if (isOwnedByCurrentUser && params.type === "playlist" && params.id === routeId) {
                                    navigate("/");
                                }
                            }}
                        >
                            {isOwnedByCurrentUser ? "Delete" : "Remove"}
                        </button>
                    </ModalContents>
                </Modal>
            )}
        </>
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

const ModalContents = styled("div", {
    display: "flex",
    justifyContent: "flex-end",
    marginTop: "$700",

    "& > button:last-child": {
        background: "$primary400",
        border: "2px solid $black800",
        borderRadius: "9999px",
    },
});

export default HeartMenuItem;
