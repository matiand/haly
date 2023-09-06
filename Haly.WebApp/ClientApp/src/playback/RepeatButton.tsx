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

    useEffect(() => {
        const keyHandler = (e: KeyboardEvent) => {
            if (e.ctrlKey && e.key === "r") {
                e.preventDefault();

                setBtnState(dispatchRepeatStateChange);
            }
        };

        window.addEventListener("keydown", keyHandler);

        return () => window.removeEventListener("keydown", keyHandler);
    }, []);

    const label = btnState === "off" ? "Enable repeat" : btnState === "on" ? "Enable repeat one" : "Disable repeat";
    const checkedState = btnState === "off" ? "false" : btnState === "on" ? "true" : "mixed";

    return (
        <PlaybackButton
            onClick={() => setBtnState(dispatchRepeatStateChange)}
            checked={checkedState}
            label={label}
            icon={btnState === "once" ? <TbRepeatOnce /> : <TbRepeat />}
            highlightedWhenActive
        />
    );
}

const dispatchRepeatStateChange = (prevState: RepeatButtonState) => {
    if (prevState === "off") return "on";
    if (prevState === "on") return "once";
    return "off";
};

export default RepeatButton;
