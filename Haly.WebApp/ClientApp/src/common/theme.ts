import { createStitches } from "@stitches/react";

export const theme = {
    colors: {
        primary300: "#feea37",
        primary400: "#fee826",
        primary500: "#c4b001",

        white400: "#a7a7a7",
        white500: "#b3b3b3",
        white600: "#bababa",
        white700: "#bdbdbd",
        white800: "#ffffff",

        black100: "#3e3e3e",
        black200: "#282828",
        black300: "#232323",
        black400: "#1a1a1a",
        black500: "#181818",
        black600: "#121212",
        black700: "#0a0a0a",
        black800: "#000000",

        danger400: "#e91429",

        scrollbarThumb: "rgba(255, 255, 255, 0.3)",
        collectionTextFaded: "rgba(255, 255, 255, 0.8)",
        collectionTableHeadBorder: "rgba(255, 255, 255, 0.1)",
        trackHover: "rgba(255, 255, 255, 0.1)",
        userMenuMask: "rgba(0, 0, 0, 0.6)",

        dominantDefault: "#535353",
        // 'Liked Songs' purple
        dominantPurple: "#5038a0",
    },
    shadows: {
        collectionImage: "rgba(0, 0, 0, 0.5)",
        collectionTableHead: "rgba(0, 0, 0, 0.5)",
    },
    fonts: {
        primary: '"Plus Jakarta Sans", sans-serif',
    },
    fontSizes: {
        100: "0.75rem",
        200: "0.81rem",
        300: "0.875rem",
        350: "0.94rem",
        400: "1rem",
        500: "1.25rem",
        600: "2rem",
        700: "3rem",
        800: "4.5rem",
        900: "6rem",
    },
    space: {
        100: "0.125rem",
        200: "0.25rem",
        300: "0.375rem",
        400: "0.5rem",
        500: "0.75rem",
        600: "1rem",
        700: "1.5rem",
        800: "2rem",
        900: "3rem",
    },
    sizes: {
        majorCollectionBackgroundHeight: "304px",
        minorCollectionBackgroundHeight: "230px",
        navIconSize: "24px",
        playbackControlsHeight: "72px",
        connectBarHeight: "24px",
        userDropdownTriggerSpanMinWidth: "110px",
        userDropdownMinWidth: "196px",
        userMenuHeight: "64px",
    },
    // These values are used by useResize hook so they need to be bare numbers
    sidebar: {
        minWidth: 190,
        defaultWidth: 270,
        maxWidth: 390,
    },
    zIndices: {
        verticalScrollbar: 10,
        resizer: 10,
        userMenu: 9,
        collectionTableHead: 2,
        collectionBackground: -1,
    },
};

const media = {
    bp1: "(min-width: 750px)",
    bp2: "(min-width: 960px)",
    bp3: "(min-width: 1060px)",
};

export const { styled, globalCss, keyframes } = createStitches({
    theme,
    media,
});
