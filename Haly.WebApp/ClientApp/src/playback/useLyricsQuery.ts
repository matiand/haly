import { useQuery } from "@tanstack/react-query";
import { useAtomValue } from "jotai/index";

import { PutLyricsRequest, ResponseError } from "../../generated/haly";
import {
    persistedGeniusTokenAtom,
    persistedWithGeniusIntegrationAtom,
    StreamedTrackDto,
} from "../common/atoms/playbackAtoms";
import halyClient from "../halyClient";

function useLyricsQuery(track: StreamedTrackDto) {
    const geniusToken = useAtomValue(persistedGeniusTokenAtom);
    const withGeniusIntegration = useAtomValue(persistedWithGeniusIntegrationAtom);

    const { playbackId, name, artists } = track;

    return useQuery(
        ["lyrics", playbackId],
        () =>
            lyricsFlow(playbackId, {
                trackName: name,
                artistName: artists[0].name,
                geniusToken,
            }),
        {
            enabled: withGeniusIntegration && Boolean(geniusToken),
            retry: 0,
        },
    );
}

async function lyricsFlow(id: string, putLyricsRequest: PutLyricsRequest) {
    try {
        return await halyClient.lyrics.getLyrics({ id });
    } catch (e) {
        if (e instanceof ResponseError && e.response.status === 404) {
            return await halyClient.lyrics.putLyrics({
                id,
                putLyricsRequest,
            });
        }

        return null;
    }
}

export default useLyricsQuery;
