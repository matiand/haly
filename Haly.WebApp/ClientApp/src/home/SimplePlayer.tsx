import { format } from "date-fns";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";

import useAccessToken from "../auth/useAccessToken";
import useInterval from "../common/useInterval";
import PlaybackState = Spotify.PlaybackState;
import ConnectMenu from "../player/ConnectMenu";

function SimplePlayer() {
    const accessToken = useAccessToken();
    const [currentTrack, setCurrentTrack] = useState<Spotify.Track>();
    const [isPaused, setIsPaused] = useState(true);
    const [positionInMs, setPositionInMs] = useState(0);
    const [fromTimestamp, setFromTimestamp] = useState(0);

    useInterval(
        () => {
            setPositionInMs(isPaused ? positionInMs : Date.now() - fromTimestamp);
        },
        isPaused ? null : 1000,
    );

    function onPlayerStateChange({ track_window, paused, position, timestamp }: PlaybackState) {
        if (!track_window) return;

        console.log("PlayerStateChanged", paused, position, track_window);
        setIsPaused(paused);
        setCurrentTrack(track_window.current_track);
        setPositionInMs(position);
        setFromTimestamp(timestamp - position);

        // const state = await player.getCurrentState();
        // console.log("awaited CurrentState", state);
    }

    const query = useQuery(["player"], () => loadSpotifyPlayer(accessToken), { staleTime: Infinity });
    const player = query.data;

    useEffect(() => {
        player?.addListener("player_state_changed", onPlayerStateChange);

        return () => player?.removeListener("player_state_changed");
    }, [player]);

    if (!player) {
        return (
            <main>
                <h1>I am a simple player!</h1>
                <p>Offline</p>
            </main>
        );
    }

    const totalTrackDuration = currentTrack?.duration_ms ?? 0;
    console.log(totalTrackDuration, positionInMs);

    return (
        <main>
            <h1>I am a simple player!</h1>
            <br />
            <p>Current track {currentTrack?.name}</p>
            <p> {currentTrack?.album?.name}</p>
            <br />
            <p>{isPaused ? "Paused" : "Playing"}</p>
            <br />
            <p>
                Player progress: {format(positionInMs, "m:ss")} / {format(totalTrackDuration, "m:ss")}
            </p>

            <ConnectMenu />
        </main>
    );
}

function loadSpotifyPlayer(accessToken: string) {
    // We have to load their sdk this way, they don't distribute on npm as a package
    const script = document.createElement("script");
    script.src = "https://sdk.scdn.co/spotify-player.js";
    script.async = true;

    document.body.appendChild(script);

    return new Promise<Spotify.Player>((resolve) => {
        window.onSpotifyWebPlaybackSDKReady = async () => {
            const player = new window.Spotify.Player({
                name: "Haly",
                getOAuthToken: (cb) => {
                    cb(accessToken);
                },
                volume: 0.5,
            });

            player.addListener("ready", ({ device_id }) => {
                console.log("Ready with Device ID", device_id);
            });

            player.addListener("not_ready", ({ device_id }) => {
                console.log("Device ID has gone offline", device_id);
            });

            await player.connect();
            resolve(player);
        };
    });
}

export default SimplePlayer;
