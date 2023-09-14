import { useQuery } from "@tanstack/react-query";
import { useSetAtom } from "jotai";
import { useCallback, useEffect, useState } from "react";

import { PlaybackContext, StreamedTrack, streamedTrackAtom } from "../common/atoms";
import PlaybackStateListener = Spotify.PlaybackStateListener;
import PlaybackState = Spotify.PlaybackState;

function useSpotifyPlaybackSdk() {
    const [deviceId, setDeviceId] = useState<string>();
    const setStreamedTrack = useSetAtom(streamedTrackAtom);

    const query = useQuery(["me", "player", "sdk"], () => initPlayerSdk(setDeviceId), { staleTime: Infinity });

    const player = query.data;

    const onPlayerStateChange = useCallback<PlaybackStateListener>(
        (state) => {
            if (!state) return;

            const track = mapStreamedTrackFromPlaybackState(state);
            setStreamedTrack(track);
        },
        [setStreamedTrack],
    );

    useEffect(() => {
        player?.addListener("player_state_changed", onPlayerStateChange);

        return () => player?.removeListener("player_state_changed");
    }, [player, onPlayerStateChange]);

    return { player, deviceId };
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

function mapStreamedTrackFromPlaybackState(state: PlaybackState): StreamedTrack | null {
    const currentTrack = state.track_window.current_track;

    // Cannot map tracks without an id.
    if (!currentTrack?.id) return null;

    return {
        spotifyId: currentTrack.id,
        name: currentTrack.name,
        durationInMs: currentTrack.duration_ms,
        positionInMs: state.position,
        isPaused: state.paused,
        updatedAt: state.timestamp,
        context: mapPlaybackContextFromPlaybackState(state),
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

function mapPlaybackContextFromPlaybackState({
    context,
    repeat_mode,
    shuffle,
}: Spotify.PlaybackState): PlaybackContext | undefined {
    if (!context.uri || !context.metadata) return;

    const type = context.uri.split(":").at(1);

    // type === "user" means it's a LikedSongs collection of our user
    if (type === "playlist" || type === "album" || type === "user") {
        return {
            collectionId: extractIdFromSpotifyUri(context.uri)!,
            name: context.metadata.name,
            type,
            isShuffled: shuffle,
            repeatMode: repeat_mode === 0 ? "off" : repeat_mode === 1 ? "context" : "track",
        };
    }

    return;
}

function extractIdFromSpotifyUri(uri: string) {
    return uri.split(":").at(-1);
}

export default useSpotifyPlaybackSdk;
