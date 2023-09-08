import { styled } from "../common/theme";
import AnimatedMusicBars from "../ui/AnimatedMusicBars";

function ActiveDevice({ name }: { name: string }) {
    return (
        <Wrapper>
            <AnimatedMusicBars type="device" />
            <h3>Current device</h3>
            <p>{name}</p>
        </Wrapper>
    );
}

const Wrapper = styled("div", {
    alignItems: "center",
    display: "grid",
    gridTemplateAreas: `"bars heading" "bars name"`,
    gridTemplateColumns: "auto 1fr",
    rowGap: "$100",
    zIndex: "$deviceDropdown",

    "& > :first-child": {
        gridArea: "bars",
        marginRight: "$600",
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
