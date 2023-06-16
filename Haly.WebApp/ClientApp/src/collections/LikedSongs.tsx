import { useQuery } from "@tanstack/react-query";
import { useSetAtom } from "jotai";
import { useEffect } from "react";

import { dominantColorsAtom } from "../common/atoms";
import { theme } from "../common/theme";
import halyClient from "../halyClient";
import { LikedSongsCollection } from "./LikedSongsCollection";

function LikedSongs() {
    const setDominantColors = useSetAtom(dominantColorsAtom);
    const query = useQuery(["me", "tracks"], () => halyClient.me.putCurrentUserLikedSongs(), {
        staleTime: 12 * 60 * 1000,
        refetchOnMount: "always",
    });

    useEffect(() => {
        if (query.data) {
            console.log("liked songs dominant color effect");
            setDominantColors((prev) => ({
                ...prev,
                [query.data.id]: theme.colors.purple,
            }));
        }
    }, [query.data, setDominantColors]);

    if (!query.data) return null;

    return <LikedSongsCollection id={query.data.id} />;
}

export default LikedSongs;
