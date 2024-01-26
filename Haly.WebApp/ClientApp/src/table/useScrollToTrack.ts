import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { AlbumTrackDto, TrackDto } from "../../generated/haly";
import { theme } from "../common/theme";

type HookParams = {
    items: TrackDto[] | AlbumTrackDto[];
    itemsTotal: number;
    getScrollElement: () => Element | null;
    fetchMoreItems?: () => void;
};

function useScrollToTrack({ items, itemsTotal, getScrollElement, fetchMoreItems }: HookParams) {
    const [searchParams] = useSearchParams();
    const [isSettled, setIsSettled] = useState(false);

    const trackId = searchParams.get("scrollToTrackId");

    useEffect(() => {
        setIsSettled(false);
    }, [trackId]);

    useEffect(() => {
        if (!trackId || isSettled) return;

        const rowIdx = items.findIndex((i) => i.id === trackId || i.playbackId === trackId);

        if (rowIdx === -1) {
            if (items.length === itemsTotal) {
                setIsSettled(true);
            } else {
                fetchMoreItems && fetchMoreItems();
            }

            return;
        }

        getScrollElement()?.scrollTo({ top: theme.tables.rowHeight * rowIdx });
        setIsSettled(true);
    }, [items, itemsTotal, trackId, isSettled, getScrollElement, fetchMoreItems]);

    return;
}

export default useScrollToTrack;
