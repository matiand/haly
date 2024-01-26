import { DndContext, DragEndEvent, PointerSensor, pointerWithin, useSensor, useSensors } from "@dnd-kit/core";
import { useAtomValue } from "jotai/index";
import React, { useCallback, useEffect } from "react";
import { useLocation } from "react-router-dom";

import { DuplicatesStrategy } from "../../generated/haly";
import { selectedTracksAtom } from "../common/atoms/trackAtoms";
import useHeartMutations from "../common/useHeartMutations";
import useAddToPlaylistMutation from "../playlist/useAddToPlaylistMutation";
import useCreatePlaylistMutation from "../playlist/useCreatePlaylistMutation";
import useMoveToPlaylistMutation from "../playlist/useMoveToPlaylistMutation";
import { dndClassNames } from "./dndStyles";
import DraggingOverlay from "./DraggingOverlay";
import { DraggableData } from "./useDraggable";
import { DroppableAreaId, LibraryItemArea } from "./useDroppableArea";

type DndContextProps = {
    children: React.ReactNode;
};

function DndProvider({ children }: DndContextProps) {
    // We need to use an activationConstraint, because some draggable elements need to handle click events as well.
    const pointerSensor = useSensor(PointerSensor, { activationConstraint: { distance: 3 } });
    // We use 'pointerWithin' collision detection strategy, so only pointer devices are allowed.
    const sensors = useSensors(pointerSensor);

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

            const data = e.active.data.current as DraggableData;
            const areaId = e.over.id as DroppableAreaId;

            if (areaId === "library") {
                // toast should be 'Added to Your Library' (or something like this)
                // if album is already saved, check if anything happens
                // if playlist is already saved, check if anything happens
                // if playlist is editable, check if it's even allowed/what happens (and you should probably disallow it)
                if (data.type === "table-row" && selectedTracks.length > 0) {
                    follow.mutate({
                        type: "track",
                        ids: selectedTracks.map(({ track }) => ({
                            likedId: track.id!,
                            playbackId: track.playbackId!,
                        })),
                    });
                } else if (data.type === "streamed-track" || data.type === "table-row") {
                    follow.mutate({
                        type: "track",
                        ids: [
                            {
                                likedId: data.id,
                                playbackId: data.id,
                            },
                        ],
                    });
                } else {
                    follow.mutate({
                        type: data.type,
                        id: data.id,
                    });
                }
            } else if (areaId === "library-plus") {
                // toast should be 'Added to {name}'

                const newPlaylistTask = createPlaylist();
                if (data.type === "table-row" && selectedTracks.length > 0) {
                    newPlaylistTask.then((playlist) =>
                        addToPlaylist.mutate({
                            playlistId: playlist.id,
                            trackUris: selectedTracks.map(({ track }) => track.uri!),
                            duplicatesStrategy: DuplicatesStrategy.FailWhenAnyDuplicate,
                        }),
                    );
                } else if (data.type === "streamed-track" || data.type === "table-row") {
                    newPlaylistTask.then((playlist) =>
                        addToPlaylist.mutate({
                            playlistId: playlist.id,
                            trackUris: [`spotify:track:${data.id}`],
                            duplicatesStrategy: DuplicatesStrategy.FailWhenAnyDuplicate,
                        }),
                    );
                } else {
                    newPlaylistTask.then((playlist) =>
                        addToPlaylist.mutate({
                            playlistId: playlist.id,
                            collectionUri: `spotify:${data.type}:${data.id}`,
                            duplicatesStrategy: DuplicatesStrategy.FailWhenAnyDuplicate,
                        }),
                    );
                }
            } else if (areaId.startsWith("library:")) {
                // toast should be 'Added to {name}'
                const { id: playlistId } = e.over.data.current as LibraryItemArea["data"];

                if (data.type === "table-row" && selectedTracks.length > 0) {
                    addToPlaylist.mutate({
                        playlistId: playlistId,
                        trackUris: selectedTracks.map(({ track }) => track.uri!),
                        duplicatesStrategy: DuplicatesStrategy.FailWhenAnyDuplicate,
                    });
                } else if (data.type === "streamed-track" || data.type === "table-row") {
                    addToPlaylist.mutate({
                        playlistId: playlistId,
                        trackUris: [`spotify:track:${data.id}`],
                        duplicatesStrategy: DuplicatesStrategy.FailWhenAnyDuplicate,
                    });
                } else {
                    addToPlaylist.mutate({
                        playlistId: playlistId,
                        collectionUri: `spotify:${data.type}:${data.id}`,
                        duplicatesStrategy: DuplicatesStrategy.FailWhenAnyDuplicate,
                    });
                }
            } else if (areaId === "backlog") {
                console.log("The backlog drop area is not implemented yet");
                console.log("Received:", data.type, data.id);
            }
        },
        [addToPlaylist, createPlaylist, follow, selectedTracks],
    );

    // On rare occassions the drag events are fired in a wrong order or don't fire at all.
    // This effect helps us recover from those bugs, by navigating to another page.
    const location = useLocation();
    useEffect(() => {
        document.body.classList.remove(dndClassNames.draggingInProgress);
        document.body.classList.remove(dndClassNames.draggingCancelled);
    }, [location]);

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={pointerWithin}
            accessibility={{
                screenReaderInstructions: { draggable: "To pick up a draggable item, use your primary pointer." },
            }}
            onDragStart={onDragStart}
            onDragCancel={onDragCancel}
            onDragEnd={onDragEnd}
        >
            {children}

            <DraggingOverlay />
        </DndContext>
    );
}

export default DndProvider;
