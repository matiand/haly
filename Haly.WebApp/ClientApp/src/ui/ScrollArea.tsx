import { useSetAtom } from "jotai/index";
import { OverlayScrollbars, PartialOptions } from "overlayscrollbars";
import { OverlayScrollbarsComponent, OverlayScrollbarsComponentRef } from "overlayscrollbars-react";
import React, { useLayoutEffect, useRef } from "react";
import { useLocation, useNavigationType } from "react-router-dom";

import { pageHeaderVisibilityAtom } from "../common/atoms/pageAtoms";
import { styled, theme } from "../common/theme";

type ScrollAreaProps = {
    children: React.ReactNode;
};

// Tell the browser to not do any scroll restoration.
history.scrollRestoration = "manual";

export function MainScrollArea({ children }: ScrollAreaProps) {
    const setPageHeaderVisibility = useSetAtom(pageHeaderVisibilityAtom);

    const { pathname } = useLocation();
    const navigationType = useNavigationType();

    const ref = useRef<OverlayScrollbarsComponentRef>(null);
    const scrollYByPathname = useRef<Record<string, number | undefined>>({});

    // Save scrollY of each page, so that we can restore it when navigating back or forward.
    useLayoutEffect(() => {
        const listener = (event: OverlayScrollbars) => {
            const viewport = event.elements().viewport;
            const child = viewport.children[0];

            scrollYByPathname.current[pathname] = Math.abs(
                child.getBoundingClientRect().top - viewport.getBoundingClientRect().top,
            );
        };

        const instance = ref.current?.osInstance();
        instance?.on("scroll", listener);

        return () => instance?.off("scroll", listener);
    }, [pathname]);

    // We use the overlayscrollbars library for custom scrollbars. Unforunately, this means that we
    // need to manage the scroll restoration manually.
    useLayoutEffect(() => {
        const viewport = ref.current?.osInstance()?.elements().viewport;
        const scrollY = scrollYByPathname.current[pathname] ?? 0;

        // Link navigation
        if (navigationType === "PUSH") {
            // Sometimes the call to scrollTo() will be ignored and I don't know why.
            // requestAnimationFrame improves the odds of it working.
            requestAnimationFrame(() => {
                viewport?.scrollTo(0, 0);
                setPageHeaderVisibility(1);
            });
        }

        // Back or forward navigation
        if (navigationType === "POP") {
            requestAnimationFrame(() => {
                viewport?.scrollTo(0, scrollY);
                setPageHeaderVisibility(scrollY === 0 ? 1 : 0);
            });
        }
    }, [navigationType, pathname, setPageHeaderVisibility]);

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
