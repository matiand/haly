import * as Dialog from "@radix-ui/react-dialog";
import React from "react";
import { IoMdClose } from "react-icons/io";

import { keyframes, styled } from "../../common/theme";

type ModalProps = {
    children: React.ReactNode;
    onClose: () => void;
    title?: string;
    renderDescription?: () => React.ReactNode;
    contentStyleOverride?: React.CSSProperties;
};

function Modal({ children, onClose, title, renderDescription, contentStyleOverride }: ModalProps) {
    return (
        <Dialog.Root defaultOpen onOpenChange={(open) => !open && onClose()}>
            <Dialog.Portal>
                <Overlay />

                <Box style={contentStyleOverride}>
                    {title && (
                        <TitleWrapper>
                            <Title>{title}</Title>
                            {renderDescription && <Description asChild>{renderDescription()}</Description>}

                            <CloseButton aria-label="Close dialog" title="Close dialog">
                                <span aria-hidden>
                                    <IoMdClose />
                                </span>
                            </CloseButton>
                        </TitleWrapper>
                    )}

                    {children}
                </Box>
            </Dialog.Portal>
        </Dialog.Root>
    );
}

const fadeIn = keyframes({
    from: {
        opacity: 0,
    },
    to: {
        opacity: 1,
    },
});

const Overlay = styled(Dialog.Overlay, {
    animation: `${fadeIn} 200ms linear`,
    background: "$modalOverlayBg",
    position: "fixed",
    inset: 0,
});

const Box = styled(Dialog.Content, {
    animation: `${fadeIn} 200ms linear`,
    background: "$white800",
    borderRadius: "8px",
    color: "$black600",
    left: "50%",
    minWidth: "400px",
    padding: "$700",
    position: "fixed",
    top: "45%",
    transform: "translate(-50%, -50%)",

    "& button": {
        cursor: "pointer",
        fontWeight: 700,
        height: "$modalBtnHeight",
        userSelect: "none",
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
});

const Description = styled(Dialog.Description, {
    fontSize: "$300",
    fontWeight: 500,

    b: {
        margin: "0 $100",
    },
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
