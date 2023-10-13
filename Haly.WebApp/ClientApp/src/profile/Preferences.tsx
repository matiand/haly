import { useAtom } from "jotai";
import { useState } from "react";

import { persistedWithImprovedShuffleAtom } from "../common/atoms";
import { styled } from "../common/theme";
import { PlaylistSortOrder, useGlobalSortOrder } from "../playlist/usePlaylistSortOrder";
import Checkbox from "./Checkbox";
import Select from "./Select";

function Preferences() {
    const [hasAccurateColors, setHasAccurateColors] = useState(true);
    const [withImprovedShuffle, setWithImprovedShuffle] = useAtom(persistedWithImprovedShuffleAtom);
    const { globalSortOrder, setGlobalSortOrder } = useGlobalSortOrder();

    const sortingOptions: Record<PlaylistSortOrder, string> = {
        [""]: "Default order",
        title: "Title",
        title_desc: "Title (reverse)",
        artist: "Artist",
        artist_desc: "Artist (reverse)",
        album: "Album",
        album_desc: "Album (reverse)",
        added_at: "Oldest",
        added_at_desc: "Newest",
        duration: "Shortest",
        duration_desc: "Longest",
    };

    return (
        <Section>
            <h1>Settings</h1>

            <div>
                <h2>Playlists</h2>
                <Select
                    id="playlists.s1"
                    label="Select how to sort tracks in playlist by default"
                    onChange={(newOption) => setGlobalSortOrder(newOption as PlaylistSortOrder)}
                    options={sortingOptions}
                    defaultOption={globalSortOrder}
                />
            </div>

            <div>
                <h2>Performance</h2>
                <Checkbox
                    id="performance.c1"
                    label="Use more accurate colors for page header backgrounds"
                    onChange={() => setHasAccurateColors((prev) => !prev)}
                    defaultValue={hasAccurateColors}
                />
            </div>

            <div>
                <h2>Playback</h2>
                <Checkbox
                    id="playback.c1"
                    label="Improve shuffling of tracks"
                    onChange={() => setWithImprovedShuffle(!withImprovedShuffle)}
                    defaultValue={withImprovedShuffle}
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

    label: {
        userSelect: "none",
    },

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
