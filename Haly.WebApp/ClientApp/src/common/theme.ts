import { createStitches } from "@stitches/react";

import resizer from "../sidebar/Resizer";

export const theme = {
    colors: {
        primary200: "#feeb44",
        primary300: "#feea37",
        primary400: "#fee826",
        primary500: "#e3cd01",
        primary600: "#cfba01",
        primary700: "#baa701",

        // todo: is this even used?
        secondary300: "#6AA9F6",
        secondary400: "#509BF5",
        secondary500: "#3B8EF4",
        secondary600: "#2582F2",
        secondary700: "#0F75F1",

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

        info400: "#005AA4",
        danger400: "#e91429",

        scrollbarThumb: "rgba(255, 255, 255, 0.3)",
        collectionTextFaded: "rgba(255, 255, 255, 0.8)",
        collectionTableHeadBorder: "rgba(255, 255, 255, 0.1)",
        trackHover: "rgba(255, 255, 255, 0.1)",
        trackSelected: "rgba(255, 255, 255, 0.3)",
        upperMenuMask: "rgba(0, 0, 0, 0.62)",
        userDropdownBtnBg: "rgba(0, 0, 0, 0.72)",
        userDropdownBtnHover: "rgba(0, 0, 0, 0.8)",
        menuItemText: "rgba(255, 255, 255, 0.9)",
        explicitMarkBg: "rgba(255, 255, 255, 0.6)",
        radioBtnBg: "rgba(255, 255, 255, 0.08)",
        radioBtnBgHover: "rgba(255, 255, 255, 0.12)",
        radioBtnBgPress: "rgba(255, 255, 255, 0.04)",
        playlistSearchBg: "rgba(255, 255, 255, 0.1)",

        dominantDefault: "#535353",
        // 'Liked Songs' purple
        dominantLikedSongs: "#5038a0",
        dominantNewReleases: "#cf4611",
    },
    shadows: {
        collectionImage: "rgba(0, 0, 0, 0.5)",
        cardImage: "rgba(0, 0, 0, 0.5)",
        collectionTableStickyHead: "rgba(0, 0, 0, 0.5)",
        moreOptionsMenuMajor: "rgba(0, 0, 0, 0.3)",
        moreOptionsMenuMinor: "rgba(0, 0, 0, 0.2)",
    },
    fonts: {
        primary: '"Plus Jakarta Sans", sans-serif',
    },
    fontSizes: {
        50: "0.6875rem",
        100: "0.75rem",
        200: "0.81rem",
        300: "0.875rem",
        350: "0.94rem",
        400: "1rem",
        500: "1.25rem",
        550: "1.5rem",
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
        collectionRowHeight: "56px",
        majorCollectionBackgroundHeight: "304px",
        minorCollectionBackgroundHeight: "230px",
        navIconSize: "24px",
        playbackControlsHeight: "72px",
        playbackControlsButtonSize: "36px",
        playbackDevicesDropdownMinWidth: "320px",
        connectBarHeight: "24px",
        dropdownMenuMinWidth: "200px",
        upperMenuHeight: "64px",
        volumeControlWidth: "132px",
        toasterBottom: "100px",
        deviceDropdownIconSize: "32px",
    },
    tables: {
        headHeight: 36,
        rowHeight: 56,
        stickyHeadMargin: 72,
    },
    cards: {
        gap: 24,
        minWidth: 196,
    },
    // These values are used by useResize hook so they need to be bare numbers
    sidebar: {
        minWidth: 280,
        defaultWidth: 360,
        maxWidth: 440,
    },
    zIndices: {
        moreOptionsMenu: 99,
        verticalScrollbar: 10,
        resizer: 10,
        upperMenuContents: 4,
        deviceDropdown: 4,
        upperMenuBackground: 3,
        collectionTableHead: 2,
        collectionBackground: -1,
    },
};

const media = {
    bp1: "(min-width: 750px)",
    bp2: "(min-width: 960px)",
    bp3: "(min-width: 1200px)",
};

export const { styled, globalCss, keyframes } = createStitches({
    theme,
    media,
});
