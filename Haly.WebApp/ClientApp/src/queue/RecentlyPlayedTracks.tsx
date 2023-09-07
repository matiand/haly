import { useQuery } from "@tanstack/react-query";
import { LuHistory } from "react-icons/lu";

import { styled } from "../common/theme";
import halyClient from "../halyClient";
import QueueEmptyState from "./QueueEmptyState";

function RecentlyPlayedTracks() {
    const query = useQuery(["me", "player", "recently-played"], () => halyClient.player.getRecentlyPlayed());

    if (!query.data) return null;

    if (query.data.length === 0) {
        return (
            <QueueEmptyState>
                <span aria-hidden>
                    <LuHistory />
                </span>

                <h1>History is empty</h1>
            </QueueEmptyState>
        );
    }

    return (
        <section>
            <h1>Recently played</h1>

            <p>Tracks go here</p>
        </section>
    );
}

export default RecentlyPlayedTracks;
