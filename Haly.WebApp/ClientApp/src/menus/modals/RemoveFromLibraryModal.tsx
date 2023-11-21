import { useSetAtom } from "jotai";

import { modalAtom } from "../../common/atoms/modalAtoms";
import { styled } from "../../common/theme";
import Modal from "./Modal";

type RemoveFromLibraryModalProps = {
    isOwnedByCurrentUser: boolean;
    entityName: string;
    onAccept: () => void;
};

function RemoveFromLibraryModal({ isOwnedByCurrentUser, entityName, onAccept }: RemoveFromLibraryModalProps) {
    const setModal = useSetAtom(modalAtom);

    return (
        <Modal
            title={`${isOwnedByCurrentUser ? "Delete" : "Remove"} from Your Library?`}
            renderDescription={() => (
                <p>
                    This will {isOwnedByCurrentUser ? "delete" : "remove"} <b>{entityName}</b> from <b>Your Library.</b>
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
