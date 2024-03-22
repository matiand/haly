import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAtomValue } from "jotai";
import { useEffect } from "react";
import { TbArrowsShuffle } from "react-icons/tb";

import { isPlaybackShuffledAtom, playbackUriAtom } from "../common/atoms/playbackAtoms";
import { GetQueueQueryKey } from "../common/queryKeys";
import halyClient from "../halyClient";
import PlaybackButton from "./PlaybackButton";

function ShuffleButton() {
    const isShuffled = useAtomValue(isPlaybackShuffledAtom);
    const playbackUri = useAtomValue(playbackUriAtom);

    const queryClient = useQueryClient();
    const shuffle = useMutation({
        mutationKey: ["me", "player", "shuffle"],
        mutationFn: (state: boolean) => halyClient.player.shuffle({ state }),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: GetQueueQueryKey }),
    });

    useEffect(() => {
        const keyHandler = (e: KeyboardEvent) => {
            if (e.ctrlKey && e.key === "s") {
                e.preventDefault();

                shuffle.mutate(!isShuffled);
            }
        };

        window.addEventListener("keydown", keyHandler);

        return () => window.removeEventListener("keydown", keyHandler);
    }, [isShuffled, shuffle]);

    const label = isShuffled ? "Disable shuffle" : "Enable shuffle";
    const checkedState = isShuffled ? "true" : "false";

    return (
        <PlaybackButton
            onClick={() => shuffle.mutate(!isShuffled)}
            checked={checkedState}
            disabled={!playbackUri}
            label={label}
            icon={<TbArrowsShuffle />}
            highlightedWhenActive
        />
    );
}

export default ShuffleButton;
