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
        200: "13px",
        300: "14px",
        400: "16px",
    },
    space: {
        100: "2px",
        200: "4px",
        300: "6px",
        400: "8px",
        500: "12px",
        600: "16px",
        700: "24px",
        800: "32px",
        900: "48px",
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
