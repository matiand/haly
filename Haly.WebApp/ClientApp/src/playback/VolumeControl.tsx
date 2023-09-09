import { useEffect, useState } from "react";
import { LuVolume1, LuVolume2, LuVolumeX } from "react-icons/lu";

import { styled } from "../common/theme";
import PlaybackButton from "./PlaybackButton";
import ProgressBar from "./ProgressBar";

type VolumeControlProps = {
    initialLevel?: number;
    setVolume: (level: number) => void;
};

function VolumeControl({ initialLevel, setVolume }: VolumeControlProps) {
    const [level, setLevel] = useState(initialLevel ?? 0.5);
    const [isMuted, setIsMuted] = useState(initialLevel === 0);
    const [isProgressBarHighlighted, setIsProgressBarHighlighted] = useState(false);

    const actualLevel = isMuted ? 0 : level;

    useEffect(() => {
        setVolume(actualLevel);
    }, [actualLevel, setVolume]);

    const icon = actualLevel === 0 ? <LuVolumeX /> : actualLevel < 0.66 ? <LuVolume1 /> : <LuVolume2 />;

    return (
        <Wrapper>
            <PlaybackButton
                onClick={() => setIsMuted((prev) => !prev)}
                onMouseEnter={() => setIsProgressBarHighlighted(true)}
                onMouseLeave={() => setIsProgressBarHighlighted(false)}
                label="Mute"
                checked={level === 0 ? "true" : "false"}
                icon={icon}
            />
            <ProgressBar
                value={actualLevel}
                onChange={(newValue) => {
                    setLevel(newValue);

                    if (isMuted && newValue > 0) {
                        setIsMuted(false);
                    }
                }}
                max={1}
                step={0.01}
                label="Change volume"
                isHighlighted={isProgressBarHighlighted}
            />
        </Wrapper>
    );
}

const Wrapper = styled("div", {
    alignItems: "center",
    display: "flex",
    flexBasis: "$volumeControlWidth",
    marginRight: "$400",
});

export default VolumeControl;
