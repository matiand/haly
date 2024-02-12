import "modern-css-reset";
import "overlayscrollbars/overlayscrollbars.css";
import "@fontsource/plus-jakarta-sans/200.css";
import "@fontsource/plus-jakarta-sans/400.css";
import "@fontsource/plus-jakarta-sans/500.css";
import "@fontsource/plus-jakarta-sans/700.css";
import "@fontsource/plus-jakarta-sans/800.css";

import { dndStyles } from "../dnd/dndStyles";
import { classNames, globalCss } from "./theme";

const globalStyles = globalCss({
    "html, body, #root": {
        height: "100%",
        minHeight: "unset",
        overscrollBehaviorY: "none",
    },

    body: {
        background: "$black600",
        color: "$white800",
        fontFamily: "$primary",
        lineHeight: 1.6,
        position: "relative",

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

    "a, button": {
        touchAction: "manipulation",
    },

    button: {
        background: "transparent",
        border: 0,
        padding: 0,
    },

    "span, svg": {
        display: "block",
    },

    mark: {
        backgroundColor: "$secondary500",
        borderRadius: "4px",
        color: "$white800",
    },

    [`.${classNames.clampEllipsis} *:focus-visible`]: {
        outline: "none",
        borderBottom: "2px solid $secondary500",
        marginBottom: "-2px",
    },

    [`.${classNames.hiddenVisually}`]: {
        clip: "rect(0 0 0 0)",
        clipPath: "inset(50%)",
        height: "1px",
        width: "1px",
        overflow: "hidden",
        position: "absolute",
        whiteSpace: "nowrap",
    },

    [`.${classNames.ellipsis}`]: {
        textOverflow: "ellipsis",
        overflow: "hidden",
        whiteSpace: "nowrap",
    },

    [`.${classNames.clampEllipsis}`]: {
        // This property specifies how many lines of text will be shown before ellipsis is applied.
        "-webkit-line-clamp": 1,
        "-webkit-box-orient": "vertical",
        display: "-webkit-box",
        overflow: "hidden",
        wordBreak: "break-all",
    },

    // Some styles of react-hot-toast Toaster have to be customized this way.
    [`.${classNames.toaster}`]: {
        "div[role='status']": {
            margin: 0,
            marginInlineStart: "$400",

            "&:first-child": {
                marginInlineStart: 0,
            },
        },
    },

    ...dndStyles,

    // Used to position react query devtools toggle btn
    ".rq-toggle": {
        left: "210px !important",
    },
});

globalStyles();
