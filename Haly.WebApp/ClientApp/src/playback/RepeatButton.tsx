import { useEffect, useState } from "react";
import { TbRepeat, TbRepeatOnce } from "react-icons/tb";

import PlaybackButton from "./PlaybackButton";

type RepeatButtonState = "off" | "on" | "once";
type RepeatButtonProps = {
    initialState?: RepeatButtonState;
    onChange: (newState: RepeatButtonState) => void;
};

function RepeatButton({ initialState, onChange }: RepeatButtonProps) {
    const [btnState, setBtnState] = useState<RepeatButtonState>(initialState ?? "off");

    useEffect(() => {
        onChange(btnState);
    }, [btnState, onChange]);

    if (btnState === "off") {
        return (
            <PlaybackButton
                onClick={() => setBtnState("on")}
                checked="false"
                label="Enable repeat"
                icon={<TbRepeat />}
            />
        );
    }

    if (btnState === "on") {
        return (
            <PlaybackButton
                onClick={() => setBtnState("once")}
                checked="true"
                label="Enable repeat one"
                icon={<TbRepeat />}
                highlightedWhenActive
            />
        );
    }

    return (
        <PlaybackButton
            onClick={() => setBtnState("off")}
            checked="mixed"
            label="Disable repeat"
            icon={<TbRepeatOnce />}
            highlightedWhenActive
        />
    );
}

export default RepeatButton;
