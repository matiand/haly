import { useCallback, useState } from "react";
import { LuVolume1, LuVolume2, LuVolumeX } from "react-icons/lu";

import { styled } from "../common/theme";
import PlaybackButton from "./PlaybackButton";
import ProgressBar from "./ProgressBar";

type VolumeControlProps = {
    initialLevel?: number;
    onChange: (newValue: number) => void;
};

type VolumeControlIconVariant = "muted" | "weak" | "strong";

function VolumeControl({ initialLevel, onChange }: VolumeControlProps) {
    const [iconVariant, setIconVariant] = useState<VolumeControlIconVariant>(getIconVariant(initialLevel ?? 0.5));
    const [isMuted, setIsMuted] = useState(initialLevel === 0);
    const [isProgressBarHighlighted, setIsProgressBarHighlighted] = useState(false);

    const onNewValue = useCallback(
        (newValue: number) => {
            if (isMuted && newValue > 0) {
                setIsMuted(false);
            }

            onChange(newValue);
            setIconVariant(getIconVariant(newValue));
        },
        [isMuted, onChange],
    );

    const icon = iconVariant === "muted" ? <LuVolumeX /> : iconVariant === "weak" ? <LuVolume1 /> : <LuVolume2 />;

    return (
        <Wrapper>
            <PlaybackButton
                onClick={() => setIsMuted((prev) => !prev)}
                onMouseEnter={() => setIsProgressBarHighlighted(true)}
                onMouseLeave={() => setIsProgressBarHighlighted(false)}
                label="Mute"
                checked={isMuted ? "true" : "false"}
                icon={icon}
            />
            <ProgressBar
                initialValue={initialLevel ?? 0.5}
                onChange={onNewValue}
                max={1}
                step={0.01}
                label="Change volume"
                isHighlighted={isProgressBarHighlighted}
                isEmpty={isMuted}
            />
        </Wrapper>
    );
}

function getIconVariant(volumeLevel: number): VolumeControlIconVariant {
    if (volumeLevel === 0) {
        return "muted";
    } else if (volumeLevel < 0.66) {
        return "weak";
    } else {
        return "strong";
    }
}

const Wrapper = styled("div", {
    alignItems: "center",
    display: "flex",
    flexBasis: "$volumeControlWidth",
    marginRight: "$400",
});

export default VolumeControl;
