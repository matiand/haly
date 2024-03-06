import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAtomValue } from "jotai";
import { useEffect } from "react";
import { TbRepeat, TbRepeatOnce } from "react-icons/tb";

import { PlaybackContext, playbackRepeatModeAtom, playbackUriAtom } from "../common/atoms/playbackAtoms";
import { GetQueueQueryKey } from "../common/queryKeys";
import halyClient from "../halyClient";
import PlaybackButton from "./PlaybackButton";

type RepeatMode = PlaybackContext["repeatMode"];

function RepeatButton() {
    const repeatMode = useAtomValue(playbackRepeatModeAtom);
    const playbackUri = useAtomValue(playbackUriAtom);
    console.log(playbackUri);

    const queryClient = useQueryClient();
    const setRepeatMode = useMutation(
        ["me", "player", "repeat-mode"],
        (repeatMode: RepeatMode) => halyClient.player.setRepeatMode({ repeatMode }),
        {
            onSuccess: () => queryClient.invalidateQueries(GetQueueQueryKey),
        },
    );

    const nextRepeatMode = getNextRepeatMode(repeatMode);

    useEffect(() => {
        const keyHandler = (e: KeyboardEvent) => {
            if (e.ctrlKey && e.key === "r") {
                e.preventDefault();

                setRepeatMode.mutate(nextRepeatMode);
            }
        };

        window.addEventListener("keydown", keyHandler);

        return () => window.removeEventListener("keydown", keyHandler);
    }, [nextRepeatMode, setRepeatMode]);

    const label =
        repeatMode === "off" ? "Enable repeat" : repeatMode === "context" ? "Enable repeat one" : "Disable repeat";
    const checkedState = repeatMode === "off" ? "false" : repeatMode === "context" ? "true" : "mixed";

    return (
        <PlaybackButton
            onClick={() => setRepeatMode.mutate(nextRepeatMode)}
            checked={checkedState}
            disabled={!playbackUri}
            label={label}
            icon={repeatMode === "track" ? <TbRepeatOnce /> : <TbRepeat />}
            highlightedWhenActive
        />
    );
}

const getNextRepeatMode = (prevState: RepeatMode) => {
    if (prevState === "off") return "context";
    if (prevState === "context") return "track";
    return "off";
};

export default RepeatButton;
