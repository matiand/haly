import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { AlbumTrackDto, TrackDto } from "../../generated/haly";
import { theme } from "../common/theme";

type HookParams = {
    mainScrollArea: Element | null;
    items: TrackDto[] | AlbumTrackDto[];
    itemsTotal: number;
    fetchMoreItems?: () => void;
};

function useScrollToTrack({ mainScrollArea, items, itemsTotal, fetchMoreItems }: HookParams) {
    const [searchParams] = useSearchParams();
    const [isSettled, setIsSettled] = useState(false);

    const trackId = searchParams.get("scrollToTrackId");

    useEffect(() => {
        setIsSettled(false);
    }, [trackId]);

    useEffect(() => {
        if (!trackId || isSettled) return;

        const rowIdx = items.findIndex((i) => i.spotifyId === trackId);

        if (rowIdx === -1) {
            if (items.length === itemsTotal) {
                setIsSettled(true);
            } else {
                fetchMoreItems && fetchMoreItems();
            }

            return;
        }

        mainScrollArea?.scrollTo({ top: theme.tables.rowHeight * rowIdx });
        setIsSettled(true);
    }, [fetchMoreItems, items, itemsTotal, mainScrollArea, trackId, isSettled]);

    return;
}

export default useScrollToTrack;
