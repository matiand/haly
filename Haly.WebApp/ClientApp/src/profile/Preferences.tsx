import { useState } from "react";

import { styled } from "../common/theme";
import Checkbox from "./Checkbox";
import Select from "./Select";

function Preferences() {
    const [hasAccurateColors, setHasAccurateColors] = useState(true);
    const [hasCustomShuffle, setHasCustomShuffle] = useState(false);

    const sortingOptions = [
        "Custom order",
        "Title",
        "Title (reverse)",
        "Artist",
        "Artist (reverse)",
        "Album",
        "Album (reverse)",
        "Newest",
        "Oldest",
        "Shortest",
        "Longest",
    ];

    return (
        <Section>
            <h1>Settings</h1>

            <div>
                <h2>Playlists</h2>
                <Select
                    id="playlists.s1"
                    label="Select how to sort tracks in playlist by default"
                    onChange={(newOption) => console.log(newOption)}
                    options={sortingOptions}
                    defaultOption={sortingOptions[0]}
                />
            </div>

            <div>
                <h2>Performance</h2>
                <Checkbox
                    id="performance.c1"
                    label="Use more accurate colors for page header backgrounds"
                    onChange={() => null}
                    defaultValue={hasAccurateColors}
                />
            </div>

            <div>
                <h2>Playback</h2>
                <Checkbox
                    id="playback.c1"
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