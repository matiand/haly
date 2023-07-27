import "modern-css-reset";
import "overlayscrollbars/overlayscrollbars.css";
import "@fontsource/plus-jakarta-sans/200.css";
import "@fontsource/plus-jakarta-sans/400.css";
import "@fontsource/plus-jakarta-sans/500.css";
import "@fontsource/plus-jakarta-sans/700.css";
import "@fontsource/plus-jakarta-sans/800.css";

import { globalCss } from "./theme";

const globalStyles = globalCss({
    "html, body, #root": {
        height: "100%",
        overscrollBehaviorY: "none",
        minHeight: "unset",
    },

    body: {
        color: "$white800",
        fontFamily: "$primary",
        lineHeight: 1.6,
        "-webkit-font-smoothing": "antialiased",
        "-moz-osx-font-smoothing": "grayscale",
    },

    ul: {
        listStyle: "none",
        margin: 0,
        padding: 0,
    },

    h2: {
        fontSize: "$550",
        fontWeight: 800,
    },

    h3: {
        fontSize: "$500",
        fontWeight: 500,
    },

    "span, svg": {
        display: "block",
    },

    ".hidden-visually": {
        clip: "rect(0 0 0 0)",
        clipPath: "inset(50%)",
        height: "1px",
        width: "1px",
        overflow: "hidden",
        position: "absolute",
        whiteSpace: "nowrap",
    },

    ".ellipsis": {
        textOverflow: "ellipsis",
        overflow: "hidden",
        whiteSpace: "nowrap",
    },

    ".line-clamp-ellipsis": {
        // This property specifies how many lines of text will be shown before ellipsis is applied.
        "-webkit-line-clamp": 1,
        "-webkit-box-orient": "vertical",
        display: "-webkit-box",
        overflow: "hidden",
        wordBreak: "break-all",
    },

    // Used to position react query devtools toggle btn
    ".rq-toggle": {
        left: "210px !important",
    },

    "a, button": {
        touchAction: "manipulation",
    },
});

globalStyles();
