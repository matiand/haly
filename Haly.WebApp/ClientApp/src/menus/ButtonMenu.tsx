import { MenuButton, useClick } from "@szhsin/react-menu";
import { ReactNode, useRef, useState } from "react";
import { FiMoreHorizontal } from "react-icons/fi";

import { styled } from "../common/theme";
import { StyledMenu } from "./MenuStyles";

type ButtonMenuProps = {
    label: string;
    children: ReactNode;
};

function ButtonMenu({ label, children }: ButtonMenuProps) {
    const ref = useRef(null);
    const [isOpen, setOpen] = useState(false);
    const anchorProps = useClick(isOpen, setOpen);

    return (
        <>
            <Button aria-label={label} title={label} ref={ref} {...anchorProps}>
                <span aria-hidden>
                    <Icon size="big" />
                </span>
            </Button>

            {isOpen && (
                <StyledMenu
                    state="open"
                    anchorRef={ref}
                    direction="bottom"
                    onClose={() => setOpen(false)}
                    portal
                    boundingBoxPadding="32"
                >
                    {children}
                </StyledMenu>
            )}
        </>
    );
}

const Button = styled(MenuButton, {
    alignItems: "center",
    background: "transparent",
    border: "0",
    color: "$white700",
    cursor: "pointer",
    display: "flex",
    justifyContent: "center",
    padding: "0",

    "&:hover, &:active, &:focus": {
        color: "$white800",
    },
});

const Icon = styled(FiMoreHorizontal, {
    variants: {
        size: {
            big: {},
            small: {
                color: "$white800",
                height: "24px",
                width: "16px",
            },
        },
    },

    height: "40px",
    width: "40px",
});

export default ButtonMenu;
