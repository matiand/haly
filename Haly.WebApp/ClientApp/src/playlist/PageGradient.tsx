import { styled, theme } from "../common/theme";
import rawNoise from "./noise.svg?raw";

type PageGradientProps = {
    color: string | null;
    type: "major" | "minor" | "mini";
};

function PageGradient({ color, type }: PageGradientProps) {
    if (!color) return null;

    // Mini should be used on its own. Major and minor should be used together.
    if (type === "mini") return <MiniGradient aria-hidden css={{ $$color: color }} />;
    if (type === "minor") return <MinorGradient aria-hidden css={{ $$color: color }} />;

    return <MajorGradient aria-hidden css={{ $$color: color }} />;
}

// We have to create the url manually because of a bug in vite.
// https://github.com/vitejs/vite/issues/1204
const noiseUrl = `data:image/svg+xml;base64,${btoa(rawNoise)}`;

const MajorGradient = styled("div", {
    background: `linear-gradient(transparent 0%, rgba(0,0,0,.6) 100%), url(${noiseUrl}), $$color `,
    display: "block",
    height: "$majorCollectionBackgroundHeight",
    left: 0,
    top: 0,
    position: "absolute",
    width: "100%",
    zIndex: "$collectionBackground",
});

const MinorGradient = styled("div", {
    background: `linear-gradient(rgba(0,0,0,.65) 0%, $black600 100%), url(${noiseUrl}), $$color`,
    display: "block",
    height: "$minorCollectionBackgroundHeight",
    left: 0,
    top: `${theme.sizes.majorCollectionBackgroundHeight}`,
    position: "absolute",
    width: "100%",
    zIndex: "$collectionBackground",
});

const MiniGradient = styled(MinorGradient, {
    height: "140px",
    top: 0,
});

export default PageGradient;
