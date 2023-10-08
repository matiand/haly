import { useMutation } from "@tanstack/react-query";
import { useAtom, useSetAtom } from "jotai";
import { useCallback, useEffect, useState } from "react";

import { PlaybackContext, playerSdkAtom, StreamedTrack, streamedTrackAtom } from "../common/atoms";

function useRegisterDeviceMutation() {
    const setStreamedTrack = useSetAtom(streamedTrackAtom);
    const [deviceId, setDeviceId] = useState<string>();
    const [errorMessage, setErrorMessage] = useState<string>();
    const [player, setPlayer] = useAtom(playerSdkAtom);

    const registerDevice = useMutation(() => registerDeviceForPlayback(setDeviceId, setErrorMessage), {
        onSuccess: (player) => {
            setPlayer(player);
        },
    });

    const onPlayerStateChange = useCallback<Spotify.PlaybackStateListener>(
        (state) => {
            console.log("new player state", state);

            if (!state) return;

            // When we are no longer the active device.
            if (!state.playback_id) {
                setStreamedTrack(null);
            }

            const track = mapStreamedTrackFromPlaybackState(state);
            setStreamedTrack(track);
        },
        [setStreamedTrack],
    );

    useEffect(() => {
        player?.addListener("player_state_changed", onPlayerStateChange);

        return () => player?.removeListener("player_state_changed");
    }, [player, onPlayerStateChange]);

    return {
        deviceId,
        errorMessage,
        registerDevice,
        reset: () => {
            setErrorMessage("");

            player?.disconnect();
            player?.removeListener("player_state_changed");
            player?.removeListener("ready");
            player?.removeListener("not_ready");

            registerDevice.reset();
        },
    };
}

async function registerDeviceForPlayback(setDeviceId: (deviceId: string) => void, setErrorMsg: (msg: string) => void) {
    const player = new window.Spotify.Player({
        name: "Haly",
        getOAuthToken: (cb) => {
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

    // todo: check if this gets called when app is offline
    player.addListener("not_ready", ({ device_id }) => {
        console.warn("Device is offline", device_id);
    });

    player.on("playback_error", ({ message }) => {
        console.error("playback_error", message);
        // These errors are temporary, so we don't inform the user.
        // setErrorMsg(message);
    });

    player.on("initialization_error", ({ message }) => {
        console.error("initialization_error", message);
        setErrorMsg(message);
    });

    player.on("authentication_error", ({ message }) => {
        console.error("authentication_error", message);
        setErrorMsg(message);
    });

    player.on("account_error", ({ message }) => {
        console.error("account_error", message);
        setErrorMsg(message);
    });

    // todo: do I need this?
    await player.connect();

    return player;
}

function mapStreamedTrackFromPlaybackState(state: Spotify.PlaybackState): StreamedTrack | null {
    const currentTrack = state.track_window.current_track;

    // Cannot map tracks without an id.
    if (!currentTrack?.id) return null;

    return {
        playbackId: currentTrack.id,
        name: currentTrack.name,
        durationInMs: currentTrack.duration_ms,
        positionInMs: state.position,
        isPaused: state.paused,
        updatedAt: state.timestamp,
        context: mapPlaybackContextFromPlaybackState(state),
        album: {
            id: extractIdFromSpotifyUri(currentTrack.album.uri)!,
            name: currentTrack.album.name,
            // Last image is the largest.
            imageUrl: currentTrack.album.images.at(-1)?.url,
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
    if (type === "playlist" || type === "album" || type === "user" || type === "artist") {
        return {
            id: extractIdFromSpotifyUri(context.uri)!,
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

export default useRegisterDeviceMutation;
