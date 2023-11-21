import { useAtomValue } from "jotai";
import { useMemo } from "react";

import { isPlaylistCachedAtom } from "../common/atoms/playlistAtoms";

function useIsPlaylistInLibrary(playlistId: string) {
    return useAtomValue(useMemo(() => isPlaylistCachedAtom(playlistId), [playlistId]));
}

export default useIsPlaylistInLibrary;
