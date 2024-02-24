import { useAtomValue } from "jotai";
import { useEffect } from "react";

import { userIsAllowedPlaybackAtom } from "../common/atoms/userAtoms";
import { styled } from "../common/theme";
import ConnectBar from "./ConnectBar";
import Playback from "./Playback";
import useRegisterDeviceMutation from "./useRegisterDeviceMutation";
import useSpotifyPlaybackSdk from "./useSpotifyPlaybackSdk";

function PlaybackWrapper() {
    const isPlaybackAllowed = useAtomValue(userIsAllowedPlaybackAtom);
    const { isSdkReady } = useSpotifyPlaybackSdk(isPlaybackAllowed);
    const { deviceId, errorMessage, registerDevice, reset } = useRegisterDeviceMutation();

    useEffect(() => {
        if (isSdkReady && registerDevice.isIdle) {
            registerDevice.mutate();
        }
    }, [isSdkReady, registerDevice]);

    if (!isPlaybackAllowed)
        return (
            <Footer>
                <ConnectBar type="forbidden" />
            </Footer>
        );

    if (errorMessage)
        return (
            <Footer>
                <ConnectBar type="failure" errorMessage={errorMessage} onAction={reset} />
            </Footer>
        );

    if (!deviceId) return null;

    return (
        <Footer>
            <Playback deviceId={deviceId} />
        </Footer>
    );
}

const Footer = styled("footer", {
    alignItems: "center",
    background: "$black800",
    display: "flex",
    flexFlow: "column nowrap",
    gridArea: "playback",
    justifyContent: "center",
});

export default PlaybackWrapper;
