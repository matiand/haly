import { useEffect, useState } from "react";
import { TbArrowsShuffle } from "react-icons/tb";

import PlaybackButton from "./PlaybackButton";

type ShuffleButtonProps = {
    initialState: boolean;
    onChange: (newState: boolean) => void;
};

function ShuffleButton({ initialState, onChange }: ShuffleButtonProps) {
    const [isShuffle, setIsShuffle] = useState(initialState ?? false);

    useEffect(() => {
        onChange(isShuffle);
    }, [isShuffle, onChange]);

    useEffect(() => {
        const keyHandler = (e: KeyboardEvent) => {
            if (e.ctrlKey && e.key === "s") {
                e.preventDefault();

                setIsShuffle((prev) => !prev);
            }
        };

        window.addEventListener("keydown", keyHandler);

        return () => window.removeEventListener("keydown", keyHandler);
    }, []);

    const label = isShuffle ? "Disable shuffle" : "Enable shuffle";
    const checkedState = isShuffle ? "true" : "false";

    return (
        <PlaybackButton
            onClick={() => setIsShuffle((prev) => !prev)}
            checked={checkedState}
            label={label}
            icon={<TbArrowsShuffle />}
            highlightedWhenActive
        />
    );
}

export default ShuffleButton;
