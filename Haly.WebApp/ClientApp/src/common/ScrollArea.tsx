import { PartialOptions } from "overlayscrollbars";
import { OverlayScrollbarsComponent, OverlayScrollbarsComponentRef } from "overlayscrollbars-react";
import React, { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

import { styled, theme } from "./theme";

type ScrollAreaProps = {
    children: React.ReactNode;
};

export function MainScrollArea({ children }: ScrollAreaProps) {
    const { pathname } = useLocation();
    const ref = useRef<OverlayScrollbarsComponentRef>(null);

    useEffect(() => {
        const instance = ref.current?.osInstance();
        const scrollToTop = () => instance?.elements().viewport.scrollTo(0, 0);

        // We cannot use window.scrollTo fn, because it doesn't work with this library
        // todo: yuck!
        if (/\/(appears-on|discography|playlists|following)/.test(pathname)) {
            scrollToTop();
        }
    }, [pathname, ref]);

    return (
        <Overlay options={options} ref={ref} defer>
            {children}
        </Overlay>
    );
}

export function ScrollArea({ children }: ScrollAreaProps) {
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

    "& [data-overlayscrollbars-viewport]": {
        borderRadius: "8px",
    },
});
