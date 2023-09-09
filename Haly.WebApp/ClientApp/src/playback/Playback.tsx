import { useQuery } from "@tanstack/react-query";
import { useSetAtom } from "jotai";

import { PlaybackContext, playbackContextAtom } from "../common/atoms";
import { styled } from "../common/theme";
import halyClient from "../halyClient";
import ConnectBar from "./ConnectBar";
import PlaybackControls from "./PlaybackControls";
import useSpotifyPlaybackSdk from "./useSpotifyPlaybackSdk";

function Playback() {
    const { player, deviceId, streamedTrack } = useSpotifyPlaybackSdk();
    const query = usePlaybackStateQuery();

    // console.log(query.isSuccess, deviceId, query.data);

    if (!query.data || !deviceId || !player) return null;

    const activeDeviceName = query.data.device.name;
    console.log(streamedTrack);

    if (!streamedTrack) {
        return (
            <Footer>
                <ConnectBar activeDeviceName={activeDeviceName} ourDeviceId={deviceId} />
            </Footer>
        );
    }

    return (
        <Footer>
            <PlaybackControls track={streamedTrack} player={player} />
        </Footer>
    );
}

function usePlaybackStateQuery() {
    const setPlaybackContext = useSetAtom(playbackContextAtom);

    return useQuery(["me", "player"], () =>
        halyClient.player
            .getPlaybackState()
            .then((data) => {
                const ctx = data.context;
                if (ctx) {
                    setPlaybackContext({ entityId: ctx.entityId, type: ctx.type as PlaybackContext["type"] });
                }

                return data;
            })
            .catch((err) => {
                if ("status" in err && err.status === 204) {
                    // todo: handle transfering playback to us here
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
