import { useAtomValue } from "jotai";

import { pageDominantColorAtom } from "../common/atoms/pageAtoms";
import { styled } from "../common/theme";
import usePageHeaderVisibility from "../common/usePageHeaderVisibility";
import PageGradient from "../playlist/PageGradient";

type MiniPageHeaderProps = {
    title: string;
};

function MiniPageHeader({ title }: MiniPageHeaderProps) {
    const { ref } = usePageHeaderVisibility();
    const color = useAtomValue(pageDominantColorAtom);

    return (
        <div>
            <Heading ref={ref}>{title}</Heading>

            {color && <PageGradient color={color} type="mini" />}
        </div>
    );
}

const Heading = styled("h1", {
    color: "$white800",
    fontSize: "$600",
    fontWeight: 800,
    letterSpacing: "-0.01em",
    marginTop: "$400",
    userSelect: "none",
});

export default MiniPageHeader;
