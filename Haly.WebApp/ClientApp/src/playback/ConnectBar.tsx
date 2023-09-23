import clsx from "clsx";

import { styled } from "../common/theme";

type ConnectBarProps = {
    type: "denied" | "failure" | "connecting" | "available";
    onAction?: () => void;
    activeDeviceName?: string;
    errorMessage?: string;
};

function ConnectBar({ type, onAction, activeDeviceName, errorMessage }: ConnectBarProps) {
    if (type === "denied") {
        return (
            <Wrapper>
                <span>Playback not allowed</span>
                <span>
                    <a href="https://www.spotify.com/us/premium/" target="_blank" rel="noreferrer">
                        Upgrade to Premium
                    </a>
                </span>
            </Wrapper>
        );
    }

    if (type === "failure") {
        return (
            <Wrapper className={clsx({ isFailure: true })}>
                {errorMessage ? <span> {errorMessage} </span> : <span>Failed to transfer playback to Haly</span>}
                <button type="button" onClick={onAction}>
                    Try again
                </button>
            </Wrapper>
        );
    }

    if (type === "connecting") {
        return (
            <Wrapper>
                <span>Connecting to Haly</span>
                <span></span>
            </Wrapper>
        );
    }

    return (
        <Wrapper className={clsx({ isAvailable: true })}>
            {activeDeviceName && <span aria-live="polite">Listening on {activeDeviceName}</span>}
            <button type="button" onClick={onAction}>
                Transfer playback
            </button>
        </Wrapper>
    );
}

const Wrapper = styled("div", {
    alignItems: "center",
    background: "$black400",
    borderRadius: "4px",
    display: "flex",
    justifyContent: "flex-end",
    height: "$connectBarHeight",
    userSelect: "none",
    width: "100%",

    "&.isAvailable": {
        background: "$primary400",

        "& > *": {
            color: "$black800",
        },
    },

    "&.isFailure": {
        background: "$danger400",
    },

    "& > span, & > button": {
        color: "$white800",
        fontSize: "$300",
        fontWeight: 500,
        marginRight: "$800",

        "& > a": {
            color: "inherit",
            textDecoration: "none",

            "&:hover": {
                textDecoration: "underline",
            },
        },
    },

    "& > button": {
        padding: 0,
        background: "none",
        border: "none",

        "&:hover": {
            cursor: "pointer",
            textDecoration: "underline",
        },

        "&:active": {
            textDecoration: "initial",
        },
    },
});

export default ConnectBar;
