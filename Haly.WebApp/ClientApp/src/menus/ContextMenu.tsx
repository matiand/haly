import { ReactNode } from "react";

import { StyledMenu } from "./MenuStyles";
import { AnchorPointMenuProps } from "./useContextMenu";

type ContextMenuProps = {
    children: ReactNode;
    menuProps: AnchorPointMenuProps;
};

export function ContextMenu({ children, menuProps }: ContextMenuProps) {
    if (menuProps.state === "closed") {
        return null;
    }

    return (
        <StyledMenu {...menuProps} direction="bottom" portal boundingBoxPadding="32">
            {children}
        </StyledMenu>
    );
}

export default ContextMenu;
