import * as Slider from "@radix-ui/react-slider";
import clsx from "clsx";

import { styled } from "../common/theme";

type ProgressBarProps = {
    value: number;
    onChange: (newValue: number) => void;
    step: number;
    max: number;
    label: string;
    isHighlighted?: boolean;
    onCommit?: (finalValue: number) => void;
    disabled?: boolean;
};

function ProgressBar({ value, onChange, max, step, label, isHighlighted, onCommit, disabled }: ProgressBarProps) {
    return (
        <Root
            className={clsx({ isHighlighted })}
            aria-label={label}
            value={[value]}
            onValueChange={(newValue) => {
                onChange(newValue[0]);
            }}
            onValueCommit={(final) => onCommit && onCommit(final[0])}
            max={max}
            step={step}
            disabled={disabled}
        >
            <Track>
                <Range className="slider-range" />
            </Track>
            <Thumb />
        </Root>
    );
}

const Root = styled(Slider.Root, {
    alignItems: "center",
    display: "flex",
    height: "16px",
    position: "relative",
    touchAction: "none",
    userSelect: "none",
    width: "100%",

    "&:hover, &.isHighlighted": {
        ".slider-range": {
            background: "$primary400",
        },

        "[role=slider]": {
            height: "13px",
        },
    },
});

const Track = styled(Slider.Track, {
    $$bg: "rgba(255, 255, 255, 0.3)",

    background: "$$bg",
    borderRadius: "4px",
    flexGrow: 1,
    height: "5px",
    position: "relative",
});

const Range = styled(Slider.Range, {
    background: "$white800",
    borderRadius: "4px",
    height: "100%",
    position: "absolute",
});

const Thumb = styled(Slider.Thumb, {
    background: "$white800",
    borderRadius: "50%",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.5)",
    // We cannot use display: "none" to hide the thumb when it is not hovered, because it will break
    // its keyboard navigation.
    height: "0px",
    width: "13px",

    "&:focus": {
        outline: "none",
    },
});

export default ProgressBar;
