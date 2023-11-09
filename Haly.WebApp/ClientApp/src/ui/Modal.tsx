import * as Dialog from "@radix-ui/react-dialog";
import React from "react";
import { IoMdClose } from "react-icons/io";

import { styled } from "../common/theme";

type ModalProps = {
    children: React.ReactNode;
    title: string;
    renderDescription?: () => React.ReactNode;
    onClose: () => void;
};

function Modal({ children, title, renderDescription, onClose }: ModalProps) {
    return (
        <Dialog.Root defaultOpen onOpenChange={(open) => !open && onClose()}>
            <Dialog.Portal>
                <Overlay />

                <Content>
                    <TitleWrapper>
                        <Title>{title}</Title>
                        {renderDescription && <Description>{renderDescription()}</Description>}

                        <CloseButton aria-label="Close dialog" title="Close dialog">
                            <span aria-hidden>
                                <IoMdClose />
                            </span>
                        </CloseButton>
                    </TitleWrapper>

                    {children}
                </Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
}

const Overlay = styled(Dialog.Overlay, {
    background: "$modalOverlayBg",
    position: "fixed",
    inset: 0,
});

const Content = styled(Dialog.Content, {
    background: "$white800",
    borderRadius: "8px",
    color: "$black600",
    left: "50%",
    minWidth: "400px",
    padding: "$700",
    position: "fixed",
    top: "40%",
    transform: "translate(-50%, -50%)",

    "& button": {
        cursor: "pointer",
        fontWeight: 700,
        height: "$modalBtnHeight",
        padding: "$400 $800",

        "&:hover": {
            transform: "scale(1.05)",
        },
    },
});

const TitleWrapper = styled("div", {
    display: "flex",
    flexDirection: "column",
    gap: "$400",
});

const Title = styled(Dialog.Title, {
    fontSize: "$500",
    fontWeight: 800,
    userSelect: "none",
});

const Description = styled(Dialog.Description, {
    fontSize: "$300",
    fontWeight: 500,
    userSelect: "none",
});

const CloseButton = styled(Dialog.Close, {
    "&&": {
        borderRadius: "50%",
        cursor: "default",
        height: "32px",
        padding: "$400",
        position: "absolute",
        right: "$400",
        top: "$400",
        width: "32px",

        "&:hover": {
            background: "rgba(0, 0, 0, 0.2)",
        },
    },
});

export default Modal;
