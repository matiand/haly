import { useQuery } from "@tanstack/react-query";
import { LuMenu } from "react-icons/lu";

import halyClient from "../halyClient";
import QueueEmptyState from "./QueueEmptyState";

type QueueTracksProps = {
    contextName?: string;
};

function QueueTracks({ contextName }: QueueTracksProps) {
    const query = useQuery(["me", "player", "queue"], () => halyClient.player.getQueue());

    if (!query.data) return null;

    if (query.data.length === 0) {
        return (
            <QueueEmptyState>
                <span aria-hidden>
                    <LuMenu />
                </span>

                <h1>Queue is empty</h1>
                <p>Use the &quot;Add to queue&quot; action from the tracks&apos; context menu to see them here.</p>
            </QueueEmptyState>
        );
    }

    return (
        <>
            <h1>Queue</h1>

            <section>
                <h2>Now playing</h2>
            </section>

            <section>
                <h2>Next from: {contextName ?? ""}</h2>
            </section>
        </>
    );
}

export default QueueTracks;
