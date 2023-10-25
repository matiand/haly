import { ControlledMenu, MenuButton, useClick } from "@szhsin/react-menu";
import { menuDividerSelector, menuItemSelector, menuSelector, submenuSelector } from "@szhsin/react-menu/style-utils";
import { MouseEvent, ReactNode, useCallback, useRef, useState } from "react";
import { FiMoreHorizontal } from "react-icons/fi";

import { styled } from "../common/theme";

type MoreOptionsProps = {
    label: string;
    children: ReactNode;
};

function MoreOptions({ label, children }: MoreOptionsProps) {
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

            <ControlledMenu
                state={isOpen ? "open" : "closed"}
                anchorRef={ref}
                direction="bottom"
                onClose={() => setOpen(false)}
                portal
                boundingBoxPadding="32"
            >
                {children}
            </ControlledMenu>
        </>
    );
}

function useContextMenu() {
    const [isOpen, setOpen] = useState(false);
    const [anchorPoint, setAnchorPoint] = useState({
        x: 0,
        y: 0,
    });

    const onContextMenu = useCallback((e: MouseEvent) => {
        console.log("context menu");
        if (typeof document.hasFocus === "function" && !document.hasFocus()) return;

        e.preventDefault();
        setAnchorPoint({
            x: e.clientX,
            y: e.clientY,
        });
        setOpen(true);
    }, []);

    return {
        onContextMenu,
        contextMenuProps: {
            state: isOpen ? "open" : "closed",
            anchorPoint,
            onClose: () => setOpen(false),
        } as AnchorPointMenuProps,
    };
}

export type ContextMenuProps = AnchorPointMenuProps & {
    children: ReactNode;
};

type AnchorPointMenuProps = {
    state: "open" | "closed";
    anchorPoint: { x: number; y: number };
    onClose: () => void;
};

export function ContextMenu({ children }: ContextMenuProps) {
    // const { onContextMenu, contextMenuProps } = useContextMenu();

    return (
        <Menu {...contextMenuProps} direction="bottom" portal boundingBoxPadding="32">
            {children}
        </Menu>
    );
}

const Menu = styled(ControlledMenu, {
    [`${menuSelector.name}`]: {
        "&&&": { display: "unset !important" },
        background: "$black200",
        boxShadow: "0px 12px 20px $moreOptionsMenuMajor, 0px 4px 6px $moreOptionsMenuMinor",
        borderRadius: "4px",
        fontSize: "$200",
        fontWeight: 500,
        minWidth: "200px",
        maxWidth: "350px",
        maxHeight: "calc(100vh - 24px)",
        padding: "$200",
        userSelect: "none",
        zIndex: "$moreOptionsMenu",
    },

    [`${menuItemSelector.name}`]: {
        alignItems: "center",
        borderRadius: "2px",
        color: "$menuItemText",
        cursor: "default",
        display: "flex",
        height: "40px",
        justifyContent: "space-between",
        outline: "none",
        padding: "$500",

        [`&${menuItemSelector.focusable}`]: {
            padding: 0,
        },
    },

    [`${submenuSelector.name} > :first-child:after`]: {
        content: "''",
        borderTop: "solid 5px transparent",
        borderLeft: "solid 6px $white800",
        borderBottom: "solid 5px transparent",
        height: 0,
        marginLeft: "auto",
        marginRight: "$200",
        width: 0,
    },

    [`${menuDividerSelector.name}`]: {
        backgroundColor: "$black100",
        height: "1px",
        padding: "0",
    },

    [`${menuItemSelector.hover}:not(${menuItemSelector.focusable})`]: {
        backgroundColor: "$trackHover",
        outline: 0,
    },

    input: {
        background: "rgba(255, 255, 255, .1)",
        border: "none",
        borderRadius: "4px",
        color: "rgba(255, 255, 255, .7)",
        padding: "$400 $500",
        width: "100%",

        "&::placeholder": {
            color: "rgba(255, 255, 255, .7)",
        },
    },
});

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
export default MoreOptions;
