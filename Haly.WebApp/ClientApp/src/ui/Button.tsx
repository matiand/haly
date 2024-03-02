import { styled } from "../common/theme";

const StyledButton = styled("button", {
    variants: {
        variant: {
            round: {
                background: "$white800",
                borderRadius: "999px",
                color: "$black800",
                cursor: "pointer",
                fontWeight: 700,
                padding: "$400 $800",

                "&:hover": {
                    transform: "scale(1.05)",
                },
            },
            square: {
                $$borderColor: "rgba(255, 255, 255, 0.3)",

                background: "transparent",
                border: "1px solid $$borderColor",
                borderRadius: "4px",
                color: "$white800",
                fontSize: "$100",
                fontWeight: "700",
                letterSpacing: "0.1em",
                lineHeight: 1.25,
                padding: "$400 $600",
                textTransform: "uppercase",
                userSelect: "none",

                "&:hover:not([disabled])": {
                    borderColor: "$white800",
                    cursor: "pointer",
                },
            },
        },
    },
});

export default StyledButton;
