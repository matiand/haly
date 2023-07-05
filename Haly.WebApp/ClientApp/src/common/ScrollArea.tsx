import { PartialOptions } from "overlayscrollbars";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import React from "react";

import { styled, theme } from "./theme";

type ScrollAreaProps = {
    children: React.ReactNode;
};

function ScrollArea({ children }: ScrollAreaProps) {
    return (
        <Overlay options={options} defer>
            {children}
        </Overlay>
    );
}

const options: PartialOptions = {
    scrollbars: {
        autoHide: "leave",
        autoHideDelay: 800,
        theme: "os-theme-light",
    },
};

const Overlay = styled(OverlayScrollbarsComponent, {
    width: "100%",

    "& .os-theme-light": {
        "$os-size": "16px",
        "$os-handle-bg": `${theme.colors.scrollbarThumb}`,
        "$os-handle-border-radius": 0,

        transition: "opacity .3s, visibility .3s",
    },

    "& .os-scrollbar-vertical": {
        zIndex: "$verticalScrollbar",
    },
});
export default ScrollArea;
