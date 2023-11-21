import { DuplicateProblem, DuplicatesStrategy, DuplicateType } from "../../../generated/haly";
import { styled } from "../../common/theme";
import Modal from "./Modal";

type DuplicateTracksProblemModalProps = {
    problem: DuplicateProblem;
    onAccept: (strategy: DuplicatesStrategy) => void;
    onCancel: () => void;
};

function DuplicateTracksProblemModal({ problem, onAccept, onCancel }: DuplicateTracksProblemModalProps) {
    const title = problem.duplicateType === DuplicateType.All ? "Already added" : "Some already added";
    const descriptionPrefix = problem.duplicateType === DuplicateType.All ? `This is` : `Some of these are`;

    return (
        <Modal
            title={title}
            onClose={onCancel}
            renderDescription={() => (
                <p>
                    {/*// todo: playlistName*/}
                    {descriptionPrefix} already in your <b>{""}</b> playlist.
                </p>
            )}
        >
            <ModalContents>
                {problem.duplicateType === DuplicateType.All ? (
                    <>
                        <button type="button" onClick={() => onAccept(DuplicatesStrategy.AddAll)}>
                            Add anyway
                        </button>
                        <button type="button" onClick={onCancel}>
                            Don&amp;&apos;t add
                        </button>
                    </>
                ) : (
                    <>
                        <button type="button" onClick={() => onAccept(DuplicatesStrategy.AddAll)}>
                            Add all
                        </button>
                        <button type="button" onClick={() => onAccept(DuplicatesStrategy.AddNewOnes)}>
                            Add new ones
                        </button>
                    </>
                )}
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
        borderRadius: "9999px",
    },
});

export default DuplicateTracksProblemModal;
