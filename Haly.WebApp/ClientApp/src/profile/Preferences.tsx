import { useState } from "react";

import { styled } from "../common/theme";
import Checkbox from "./Checkbox";

function Preferences() {
    const [hasAccurateColors, setHasAccurateColors] = useState(true);
    const [hasCustomShuffle, setHasCustomShuffle] = useState(false);

    return (
        <Section>
            <h1>Settings</h1>

            <div>
                <h2>Performance</h2>
                <Checkbox
                    id="c1"
                    label="Use more accurate colors for page header backgrounds"
                    onChange={() => null}
                    defaultValue={hasAccurateColors}
                />
            </div>

            <div>
                <h2>Playback</h2>
                <Checkbox
                    id="c1"
                    label="Use custom shuffle algorithm"
                    onChange={() => null}
                    defaultValue={hasCustomShuffle}
                />
            </div>
        </Section>
    );
}

const Section = styled("section", {
    display: "flex",
    flexDirection: "column",
    gap: "$700",
    margin: "0 auto",
    maxWidth: "900px",

    "&&&": {
        paddingTop: "$700",
    },

    "& > h1": {
        fontWeight: 800,
        paddingBottom: "$600",
    },

    "& > div": {
        div: {
            alignItems: "center",
            display: "flex",
            gap: "$400",
            justifyContent: "space-between",
        },

        h2: {
            fontSize: "$500",
            marginBottom: "$500",
        },

        label: {
            color: "$white400",
            fontSize: "$300",
            fontWeight: 500,
        },
    },
});

export default Preferences;
