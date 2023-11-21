import { useAtomValue } from "jotai";
import { LuLaptop2 } from "react-icons/lu";

import { isTrackPausedAtom } from "../common/atoms/playbackAtoms";
import { styled } from "../common/theme";
import AnimatedMusicBars from "../ui/AnimatedMusicBars";

function ActiveDevice({ name }: { name: string }) {
    const isTrackPaused = useAtomValue(isTrackPausedAtom);

    return (
        <Wrapper>
            {isTrackPaused ? (
                <span aria-hidden>
                    <LuLaptop2 />
                </span>
            ) : (
                <AnimatedMusicBars type="device" />
            )}

            <h3>Current device</h3>
            <p>{name}</p>
        </Wrapper>
    );
}

const Wrapper = styled("div", {
    alignItems: "center",
    display: "grid",
    gridTemplateAreas: `"device heading" "device name"`,
    gridTemplateColumns: "auto 1fr",
    rowGap: "$100",
    zIndex: "$deviceDropdown",

    "& > :first-child": {
        color: "$primary400",
        gridArea: "device",
        marginRight: "$600",

        svg: {
            height: "$deviceDropdownIconSize",
            width: "$deviceDropdownIconSize",
        },
    },

    h3: {
        fontSize: "$400",
        fontWeight: 700,
    },

    p: {
        color: "$primary400",
        fontSize: "$300",
        fontWeight: 500,
    },
});

export default ActiveDevice;
