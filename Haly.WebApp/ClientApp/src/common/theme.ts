import { createStitches } from "@stitches/react";

export const theme = {
    colors: {
        primary: "#001f3f",
        white: "#fff",
        grey100: "#b3b3b3",
        grey200: "#bdbdbd",
        black300: "#3e3e3e",
        black500: "#282828",
        black700: "#0a0a0a",
        black800: "#000000",
    },
    fonts: {
        primary: '"Plus Jakarta Sans", sans-serif',
    },
    fontSizes: {
        200: "0.81rem",
        300: "0.875rem",
        400: "1rem",
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
        topbarHeight: "64px",
        spotifyBannerMaxWidth: "36px",
        userDropdownTriggerSpanMinWidth: "110px",
        userDropdownMinWidth: "196px",
        navIconSize: "24px",
    },
    // These values are used by useResize hook so they need to be bare numbers
    sidebar: {
        minWidth: 190,
        defaultWidth: 240,
        maxWidth: 390,
    },
};

export const { styled, globalCss } = createStitches({ theme });
