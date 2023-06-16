import { createStitches } from "@stitches/react";

export const theme = {
    colors: {
        primary: "#fee715",
        primary300: "#fee715",
        primary400: "#fee715",
        primary500: "#fee715",
        white: "#fff",
        grey100: "#bdbdbd",
        grey150: "#bababa",
        grey200: "#b3b3b3",
        grey300: "#a7a7a7",
        black300: "#3e3e3e",
        black500: "#282828",
        black550: "#181818",
        black600: "#121212",
        black700: "#0a0a0a",
        black800: "#000000",
        danger: "#e91429",
        // 'Liked Songs' purple
        purple: "#5038a0",
        defaultDominantColor: "#535353",
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
        500: "1.5rem",
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
        playingbarHeight: "64px",
        spotifyBannerHeight: "64px",
        userDropdownTriggerSpanMinWidth: "110px",
        userDropdownMinWidth: "196px",
        navIconSize: "24px",
        historyNavBtnSize: "32px",
        historyNavIconSize: "24px",
    },
    // These values are used by useResize hook so they need to be bare numbers
    sidebar: {
        minWidth: 190,
        defaultWidth: 270,
        maxWidth: 390,
    },
};

const media = {
    bp1: "(min-width: 750px)",
    bp2: "(min-width: 960px)",
    bp3: "(min-width: 1060px)",
};

export const { styled, globalCss } = createStitches({
    theme,
    media,
});
