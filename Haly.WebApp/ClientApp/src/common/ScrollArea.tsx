import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import React from "react";

import { theme } from "./theme";

type ScrollAreaProps = {
    variant: "sidebar" | "main";
    children: React.ReactNode;
};

function ScrollArea({ children }: ScrollAreaProps) {
    return (
        <OverlayScrollbarsComponent
            style={sidebarStyles}
            options={{
                scrollbars: {
                    autoHide: "leave",
                    autoHideDelay: 800,
                    theme: "os-theme-light",
                },
            }}
            defer
        >
            {children}
        </OverlayScrollbarsComponent>
    );
}

const sidebarStyles = {
    "--os-size": "16px",
    "--os-handle-bg": `${theme.colors.scrollbarThumb}`,
    "--os-handle-border-radius": 0,
} as React.CSSProperties;

export default ScrollArea;
