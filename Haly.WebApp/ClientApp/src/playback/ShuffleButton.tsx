import { useEffect, useState } from "react";
import { TbArrowsShuffle } from "react-icons/tb";

import PlaybackButton from "./PlaybackButton";

type ShuffleButtonState = "off" | "on";
type ShuffleButtonProps = {
    initialState?: ShuffleButtonState;
    onChange: (newState: ShuffleButtonState) => void;
};

function ShuffleButton({ initialState, onChange }: ShuffleButtonProps) {
    const [btnState, setBtnState] = useState<ShuffleButtonState>(initialState ?? "off");

    useEffect(() => {
        onChange(btnState);
    }, [btnState, onChange]);

    if (btnState === "off") {
        return (
            <PlaybackButton
                onClick={() => setBtnState("on")}
                checked="false"
                label="Enable shuffle"
                icon={<TbArrowsShuffle />}
            />
        );
    }

    return (
        <PlaybackButton
            onClick={() => setBtnState("off")}
            checked="true"
            label="Disable shuffle"
            icon={<TbArrowsShuffle />}
        />
    );
}

export default ShuffleButton;
