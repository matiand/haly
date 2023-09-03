import { useQuery } from "@tanstack/react-query";

import { styled } from "../common/theme";
import halyClient from "../halyClient";
import ConnectBar from "./ConnectBar";
import PlaybackControls from "./PlaybackControls";
import useSpotifyPlaybackSdk from "./useSpotifyPlaybackSdk";

function Playback() {
    const { player, deviceId, isPaused, positionInMs, streamedTrack } = useSpotifyPlaybackSdk();
    const query = usePlaybackStateQuery();

    console.log(query.isSuccess, query.data);

    if (!query.data || !deviceId) return null;

    const activeDeviceName = query.data.device.name;
    console.log(streamedTrack, positionInMs);

    if (!streamedTrack) {
        return (
            <Footer>
                <ConnectBar activeDeviceName={activeDeviceName} ourDeviceId={deviceId} />
            </Footer>
        );
    }

    return (
        <Footer>
            <PlaybackControls track={streamedTrack} />
        </Footer>
    );
}

function usePlaybackStateQuery() {
    return useQuery(["me", "player"], () =>
        halyClient.player.getPlaybackState().catch((err) => {
            if ("status" in err && err.status === 204) {
                // todo: handle transfering playback to use here
                return null;
            }
        }),
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

export default Playback;
