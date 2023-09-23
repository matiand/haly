import { useEffect, useRef, useState } from "react";

function useSpotifyPlaybackSdk(enabled: boolean) {
    const isSdkInitRef = useRef(false);
    const [isSdkReady, setIsSdkReady] = useState(false);

    useEffect(() => {
        if (!isSdkInitRef.current && enabled) {
            // We have to load their sdk this way, they don't provide a package for it.
            // https://developer.spotify.com/documentation/web-playback-sdk/howtos/web-app-player#webplayback-component
            const script = document.createElement("script");
            script.src = "https://sdk.scdn.co/spotify-player.js";
            script.async = true;

            document.body.appendChild(script);

            window.onSpotifyWebPlaybackSDKReady = () => {
                setIsSdkReady(true);
            };

            isSdkInitRef.current = true;
        }
    }, [enabled]);

    return {
        isSdkReady,
    };
}

export default useSpotifyPlaybackSdk;
