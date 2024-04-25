import { keyframes, styled } from "../common/theme";

type AnimatedMusicBarsProps = {
    type: "cell" | "device";
};

function AnimatedMusicBars({ type }: AnimatedMusicBarsProps) {
    return (
        <Wrapper type={type} aria-hidden data-testid="animated-music-bars">
            <span />
            <span />
            <span />
            <span />
        </Wrapper>
    );
}

const bounce = keyframes({
    "0%": {
        transform: "scaleY(0.15)",
    },
    "20%": {
        transform: "scaleY(0.25)",
    },
    "35%": {
        transform: "scaleY(0.5)",
    },
    "50%": {
        transform: "scaleY(0.6)",
    },
    "70%": {
        transform: "scaleY(0.8)",
    },
    "85%": {
        transform: "scaleY(0.9)",
    },
    "95%": {
        transform: "scaleY(0.6)",
    },
    "100%": {
        transform: "scaleY(0.4)",
    },
});

const Wrapper = styled("div", {
    variants: {
        type: {
            cell: {
                height: "16px",
                width: "16px",

                span: {
                    width: "2px",
                },
            },
            device: {},
        },
    },

    display: "flex",
    height: "32px",
    justifyContent: "space-around",
    position: "relative",
    width: "32px",

    span: {
        animation: `${bounce} 0.9s ease infinite`,
        background: "$primary400",
        borderRadius: "4px",
        height: "100%",
        transformOrigin: "bottom",
        width: "3px",

        "&:nth-of-type(2)": {
            animationDelay: "-0.3s",
        },

        "&:nth-of-type(3)": {
            animationDelay: "-0.5s",
        },

        "&:nth-of-type(4)": {
            animationDelay: "-0.15s",
        },
    },
});

export default AnimatedMusicBars;
