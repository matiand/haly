import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAtomValue } from "jotai";
import { useEffect } from "react";
import { TbArrowsShuffle } from "react-icons/tb";

import { playbackContextAtom } from "../common/atoms";
import halyClient from "../halyClient";
import { QueueQueryKey } from "../queue/useQueueQuery";
import PlaybackButton from "./PlaybackButton";

function ShuffleButton() {
    const playbackContext = useAtomValue(playbackContextAtom);

    const queryClient = useQueryClient();
    const shuffle = useMutation(["me", "player", "shuffle"], (state: boolean) => halyClient.player.shuffle({ state }), {
        onSuccess: () => queryClient.invalidateQueries(QueueQueryKey),
    });

    const isShuffle = playbackContext?.isShuffled ?? false;

    useEffect(() => {
        const keyHandler = (e: KeyboardEvent) => {
            if (e.ctrlKey && e.key === "s") {
                e.preventDefault();

                shuffle.mutate(!isShuffle);
            }
        };

        window.addEventListener("keydown", keyHandler);

        return () => window.removeEventListener("keydown", keyHandler);
    }, [isShuffle, shuffle]);

    const label = isShuffle ? "Disable shuffle" : "Enable shuffle";
    const checkedState = isShuffle ? "true" : "false";

    return (
        <PlaybackButton
            onClick={() => shuffle.mutate(!isShuffle)}
            checked={checkedState}
            label={label}
            icon={<TbArrowsShuffle />}
            highlightedWhenActive
        />
    );
}

export default ShuffleButton;
