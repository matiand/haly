import { styled } from "../common/theme";

type UpperMenuBackgroundProps = {
    color: string | null;
    opacity: number;
};

function UpperMenuBackground({ color, opacity }: UpperMenuBackgroundProps) {
    if (!color) return null;

    return (
        <Wrapper
            css={{
                $$color: color,
                opacity,
            }}
        >
            <ColorMask />
        </Wrapper>
    );
}

const Wrapper = styled("div", {
    background: "$$color",
    borderRadius: "8px 8px 0 0",
    height: "100%",
    position: "absolute",
    left: 0,
    right: 0,
    zIndex: "$upperMenuBackground",
});

const ColorMask = styled("div", {
    background: "$upperMenuMask",
    height: "100%",
});

export default UpperMenuBackground;
