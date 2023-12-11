import { useAtomValue, useSetAtom } from "jotai";
import { useNavigate } from "react-router-dom";

import { modalAtom, RemoveFromLibraryModalProps } from "../../common/atoms/modalAtoms";
import { pageContextIdAtom } from "../../common/atoms/pageAtoms";
import { styled } from "../../common/theme";
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
                <button
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
                </button>
            </ModalContents>
        </Modal>
    );
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

export default RemoveFromLibraryModal;
