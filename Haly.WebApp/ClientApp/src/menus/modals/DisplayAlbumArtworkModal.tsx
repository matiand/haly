import { useSetAtom } from "jotai/index";

import { modalAtom } from "../../common/atoms/modalAtoms";
import { styled } from "../../common/theme";
import Modal from "./Modal";

type DisplayAlbumArtworkProps = {
    imageUrl: string;
};

function DisplayAlbumArtworkModal({ imageUrl }: DisplayAlbumArtworkProps) {
    const setModal = useSetAtom(modalAtom);

    const onClose = () => setModal(null);

    return (
        <Modal
            onClose={onClose}
            contentStyleOverride={{
                background: "none",
                padding: 0,
            }}
        >
            <Wrapper>
                <Image alt="" src={imageUrl} loading="eager" draggable={false} />

                <Button type="button" onClick={onClose}>
                    Close
                </Button>
            </Wrapper>
        </Modal>
    );
}

const Wrapper = styled("div", {
    alignItems: "center",
    display: "flex",
    flexFlow: "column nowrap",
    gap: "$600",
});

const Image = styled("img", {
    borderRadius: "8px",
    flex: "0 0 auto",
    objectFit: "cover",
    objectPosition: "center center",
});

const Button = styled("button", {
    color: "$white800",
});

export default DisplayAlbumArtworkModal;
