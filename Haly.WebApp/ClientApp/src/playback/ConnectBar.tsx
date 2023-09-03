import { useMutation } from "@tanstack/react-query";
import clsx from "clsx";

import { styled } from "../common/theme";
import halyClient from "../halyClient";

type ConnectBarProps = {
    activeDeviceName: string;
    ourDeviceId: string;
};

function ConnectBar({ activeDeviceName, ourDeviceId }: ConnectBarProps) {
    const transferPlayback = useMutation(() => halyClient.player.transferPlayback({ deviceId: ourDeviceId }));

    const isConnecting = !transferPlayback.isIdle;

    if (isConnecting) {
        return (
            <Wrapper className={clsx({ isConnecting })}>
                <span aria-live="polite">Connecting to Haly</span>
                <span></span>
            </Wrapper>
        );
    }

    return (
        <Wrapper className={clsx({ isTransferring: isConnecting })}>
            <span aria-live="polite">Listening on {activeDeviceName}</span>
            <button type="button" onClick={() => transferPlayback.mutate()}>
                Transfer playback
            </button>
        </Wrapper>
    );
}

const Wrapper = styled("div", {
    alignItems: "center",
    background: "$primary400",
    borderRadius: "4px",
    display: "flex",
    justifyContent: "flex-end",
    height: "$connectBarHeight",
    userSelect: "none",
    width: "100%",

    "&.isConnecting": {
        background: "$black400",

        "& > *": {
            color: "$white800",
        },
    },

    "& > span, & > button": {
        color: "$black800",
        fontSize: "$300",
        fontWeight: 500,
        marginRight: "$800",
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
            color: "$black200",
        },
    },
});

export default ConnectBar;
