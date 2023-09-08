import { keyframes, styled } from "../common/theme";

type AnimatedMusicBarsProps = {
    type: "track" | "device";
};

function AnimatedMusicBars({ type }: AnimatedMusicBarsProps) {
    return (
        <Wrapper type={type} aria-hidden>
            <span />
            <span />
            <span />
            <span />
        </Wrapper>
    );
}

const bounce = keyframes({
    "0%": {
        transform: "scaleY(0.3)",
    },
    "20%": {
        transform: "scaleY(0.1)",
    },
    "60%": {
        transform: "scaleY(0.5)",
    },
    "80%": {
        transform: "scaleY(0.7)",
    },
    "100%": {
        transform: "scaleY(0.4)",
    },
});

const Wrapper = styled("div", {
    variants: {
        type: {
            track: {
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
        animation: `${bounce} 1.3s ease infinite alternate`,
        background: "$primary400",
        borderRadius: "4px",
        height: "100%",
        transformOrigin: "bottom",
        width: "3px",

        "&:nth-of-type(2)": {
            animationDelay: "-0.4s",
        },

        "&:nth-of-type(3)": {
            animationDelay: "-0.2s",
        },
        "&:nth-of-type(4)": {
            animationDelay: "-0.1s",
        },
    },
});

export default AnimatedMusicBars;
