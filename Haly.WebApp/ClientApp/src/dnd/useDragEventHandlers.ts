import { DragEndEvent } from "@dnd-kit/core";
import { useAtomValue } from "jotai";
import { useCallback } from "react";

import { DuplicatesStrategy } from "../../generated/haly";
import { selectedTracksAtom } from "../common/atoms/trackAtoms";
import useHeartMutations from "../common/useHeartMutations";
import halyClient from "../halyClient";
import useAddToPlaylistMutation from "../playlist/useAddToPlaylistMutation";
import useCreatePlaylistMutation from "../playlist/useCreatePlaylistMutation";
import useMoveToPlaylistMutation from "../playlist/useMoveToPlaylistMutation";
import { dndClassNames } from "./dndStyles";
import { DraggableData } from "./useDraggable";
import { DroppableAreaId, LibraryItemArea } from "./useDroppableArea";

function useDragEventHandlers() {
    const onDragStart = useCallback(() => {
        document.body.classList.add(dndClassNames.draggingInProgress);
        document.body.classList.remove(dndClassNames.draggingCancelled);
    }, []);

    const onDragCancel = useCallback(() => {
        document.body.classList.remove(dndClassNames.draggingInProgress);
        document.body.classList.add(dndClassNames.draggingCancelled);
    }, []);

    const selectedTracks = useAtomValue(selectedTracksAtom);
    const { follow } = useHeartMutations();
    const createPlaylist = useCreatePlaylistMutation();
    const addToPlaylist = useAddToPlaylistMutation();
    const moveToPlaylist = useMoveToPlaylistMutation();
    const onDragEnd = useCallback(
        (e: DragEndEvent) => {
            document.body.classList.remove(dndClassNames.draggingInProgress);
            if (!e.over) return;

            const item = e.active.data.current as DraggableData;
            const areaId = e.over.id as DroppableAreaId;

            if (areaId === "library") {
                if (item.type === "table-row" && selectedTracks.length > 0) {
                    follow.mutate({
                        type: "track",
                        ids: selectedTracks.map(({ track }) => ({
                            likedId: track.id!,
                            playbackId: track.playbackId!,
                        })),
                    });
                } else if (item.type === "streamed-track" || item.type === "table-row") {
                    follow.mutate({
                        type: "track",
                        ids: [
                            {
                                likedId: item.id,
                                playbackId: item.id,
                            },
                        ],
                    });
                } else {
                    follow.mutate({
                        type: item.type,
                        id: item.id,
                    });
                }

                return;
            }

            if (areaId === "library-plus") {
                const playlistName = typeof item.title === "string" ? item.title : item.title[0];
                const newPlaylistTask = createPlaylist(playlistName).then(async (playlist) => {
                    // We need to update our cache before calling addToPlaylist endpoint.
                    await halyClient.me.putMyPlaylists();
                    return playlist;
                });

                if (item.type === "table-row" && selectedTracks.length > 0) {
                    newPlaylistTask.then((playlist) =>
                        addToPlaylist.mutate({
                            playlistId: playlist.id,
                            trackUris: selectedTracks.map(({ track }) => track.uri!),
                            duplicatesStrategy: DuplicatesStrategy.FailWhenAnyDuplicate,
                        }),
                    );
                } else if (item.type === "streamed-track" || item.type === "table-row") {
                    newPlaylistTask.then((playlist) =>
                        addToPlaylist.mutate({
                            playlistId: playlist.id,
                            trackUris: [`spotify:track:${item.id}`],
                            duplicatesStrategy: DuplicatesStrategy.FailWhenAnyDuplicate,
                        }),
                    );
                } else {
                    newPlaylistTask.then((playlist) =>
                        addToPlaylist.mutate({
                            playlistId: playlist.id,
                            collectionUri: `spotify:${item.type}:${item.id}`,
                            duplicatesStrategy: DuplicatesStrategy.FailWhenAnyDuplicate,
                        }),
                    );
                }

                return;
            }

            if (areaId.startsWith("library:")) {
                const { id: playlistId } = e.over.data.current as LibraryItemArea["data"];

                if (item.moveParams) {
                    moveToPlaylist.mutate({
                        fromPlaylistId: item.moveParams.fromPlaylistId,
                        toPlaylistId: playlistId,
                        tracks: [
                            {
                                uri: `spotify:track:${item.id}`,
                                position: -1,
                            },
                        ],
                    });
                } else if (item.type === "table-row" && selectedTracks.length > 0) {
                    addToPlaylist.mutate({
                        playlistId: playlistId,
                        trackUris: selectedTracks.map(({ track }) => track.uri!),
                        duplicatesStrategy: DuplicatesStrategy.FailWhenAnyDuplicate,
                    });
                } else if (item.type === "streamed-track" || item.type === "table-row") {
                    addToPlaylist.mutate({
                        playlistId: playlistId,
                        trackUris: [`spotify:track:${item.id}`],
                        duplicatesStrategy: DuplicatesStrategy.FailWhenAnyDuplicate,
                    });
                } else {
                    addToPlaylist.mutate({
                        playlistId: playlistId,
                        collectionUri: `spotify:${item.type}:${item.id}`,
                        duplicatesStrategy: DuplicatesStrategy.FailWhenAnyDuplicate,
                    });
                }

                return;
            }

            if (areaId === "backlog") {
                console.log("The backlog drop area is not implemented yet");
                console.log("Received:", item.type, item.id);

                return;
            }
        },
        [addToPlaylist, createPlaylist, moveToPlaylist, follow, selectedTracks],
    );

    return {
        onDragStart,
        onDragCancel,
        onDragEnd,
    };
}

export default useDragEventHandlers;
