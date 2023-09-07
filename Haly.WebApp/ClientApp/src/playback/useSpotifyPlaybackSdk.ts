import { useQuery } from "@tanstack/react-query";
import { useSetAtom } from "jotai";
import { useCallback, useEffect, useState } from "react";

import { PlaybackContext, playbackContextAtom, StreamedTrack } from "../common/atoms";
import PlaybackTrackWindow = Spotify.PlaybackTrackWindow;
import PlaybackStateListener = Spotify.PlaybackStateListener;

function useSpotifyPlaybackSdk() {
    const [deviceId, setDeviceId] = useState<string>();
    const [isPaused, setIsPaused] = useState(true);
    const [positionInMs, setPositionInMs] = useState<number>();
    const [streamedTrack, setStreamedTrack] = useState<StreamedTrack>();
    const setPlaybackContext = useSetAtom(playbackContextAtom);

    const query = useQuery(["me", "player", "sdk"], () => initPlayerSdk(setDeviceId), { staleTime: Infinity });

    const player = query.data;

    //     const [fromTimestamp, setFromTimestamp] = useState(0);

    const onPlayerStateChange = useCallback<PlaybackStateListener>(
        (state) => {
            if (!state) return;
            const { track_window, paused, position, timestamp, context } = state;

            setIsPaused(paused);
            setPositionInMs(position);

            const track = mapStreamedTrackFromPlaybackTrackWindow(track_window);
            setStreamedTrack(track);
            const ctx = mapPlaybackContextFromSpotifyContext(context);
            setPlaybackContext(ctx);
        },
        [setPlaybackContext],
    );

    useEffect(() => {
        player?.addListener("player_state_changed", onPlayerStateChange);

        return () => player?.removeListener("player_state_changed");
    }, [player, onPlayerStateChange]);

    return { player, deviceId, isPaused, positionInMs, streamedTrack };
}

function initPlayerSdk(setDeviceId: (deviceId: string) => void) {
    // We have to load their sdk this way, they don't provide a package for it.
    // https://developer.spotify.com/documentation/web-playback-sdk/howtos/web-app-player#webplayback-component
    const script = document.createElement("script");
    script.src = "https://sdk.scdn.co/spotify-player.js";
    script.async = true;

    document.body.appendChild(script);

    return new Promise<Spotify.Player>((resolve) => {
        window.onSpotifyWebPlaybackSDKReady = async () => {
            const player = new window.Spotify.Player({
                name: "Haly",
                getOAuthToken: (cb) => {
                    console.log("playback wants fresh token");
                    const accessToken = localStorage.getItem("spotifyToken");

                    if (!accessToken) {
                        console.error("Playback SDK needs an access token but it couldn't be found");
                        return;
                    }

                    cb(accessToken);
                },
                volume: 0.5,
            });

            player.addListener("ready", ({ device_id }) => {
                console.log("Ready with Device ID", device_id);
                setDeviceId(device_id);
            });

            // How can this happen?
            player.addListener("not_ready", ({ device_id }) => {
                console.log("Device ID is not ready", device_id);
            });

            await player.connect();
            resolve(player);
        };
    });
}

function mapStreamedTrackFromPlaybackTrackWindow(data: PlaybackTrackWindow): StreamedTrack | undefined {
    const currentTrack = data.current_track;

    // Skip tracks without an id.
    if (!currentTrack.id) return;

    return {
        spotifyId: currentTrack.id,
        name: currentTrack.name,
        album: {
            id: extractIdFromSpotifyUri(currentTrack.album.uri)!,
            name: currentTrack.album.name,
            imageUrl: currentTrack.album.images[0]?.url,
        },
        artists: currentTrack.artists.map((artist) => ({
            id: extractIdFromSpotifyUri(artist.uri)!,
            name: artist.name,
        })),
    };
}

function mapPlaybackContextFromSpotifyContext(context: Spotify.PlaybackContext): PlaybackContext | null {
    if (!context.uri) return null;

    const type = context.uri.split(":").at(-2);
    if (type === "playlist" || type === "album") {
        return {
            entityId: extractIdFromSpotifyUri(context.uri)!,
            type,
        };
    }

    return null;
}

function extractIdFromSpotifyUri(uri: string) {
    return uri.split(":").at(-1);
}

export default useSpotifyPlaybackSdk;
