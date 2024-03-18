import { useAtomValue, useSetAtom } from "jotai";
import { useNavigate } from "react-router-dom";

import { modalAtom, RemoveFromLibraryModalProps } from "../../common/atoms/modalAtoms";
import { pageContextIdAtom } from "../../common/atoms/pageAtoms";
import { styled } from "../../common/theme";
import Button from "../../ui/Button";
import Modal from "./Modal";

function RemoveFromLibraryModal({ id, name, isOwnedByCurrentUser, onAccept }: RemoveFromLibraryModalProps) {
    const navigate = useNavigate();

    const setModal = useSetAtom(modalAtom);
    const contextId = useAtomValue(pageContextIdAtom);

    return (
        <Modal
            title={`${isOwnedByCurrentUser ? "Delete" : "Remove"} from Your Library?`}
            renderDescription={() => (
                <p>
                    This will {isOwnedByCurrentUser ? "delete" : "remove"} <b>{name}</b> from <b>Your Library.</b>
                </p>
            )}
            onClose={() => setModal(null)}
        >
            <ModalContents>
                <button type="button" onClick={() => setModal(null)}>
                    Cancel
                </button>
                <Button
                    variant="round"
                    type="button"
                    onClick={() => {
                        onAccept();
                        setModal(null);

                        if (isOwnedByCurrentUser && contextId === id) {
                            navigate("/");
                        }
                    }}
                >
                    {isOwnedByCurrentUser ? "Delete" : "Remove"}
                </Button>
            </ModalContents>
        </Modal>
    );
}

const ModalContents = styled("div", {
    display: "flex",
    gap: "$800",
    justifyContent: "flex-end",
    marginTop: "$800",

    "& > button:first-child": {
        fontWeight: 500,

        "&:hover": {
            fontWeight: 700,
        },
    },

    "& > button:last-child": {
        background: "$primary400",
        border: "2px solid $black800",
    },
});

export default RemoveFromLibraryModal;
