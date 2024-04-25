import { faker } from "@faker-js/faker";

import { AlbumTrackDto, TrackDto } from "../../generated/haly";
import { StreamedTrackDto } from "../../src/common/atoms/playbackAtoms";

export function createRandomUri(typeOverride?: "album" | "playlist" | "user") {
    const type = typeOverride ?? faker.helpers.arrayElement(["album", "playlist", "user"]);

    return `spotify:${type}:${faker.string.numeric(12)}`;
}

export function createRandomTrack(): TrackDto {
    const id = faker.string.numeric(12);

    return {
        id,
        playbackId: faker.string.numeric(12),
        name: faker.commerce.productName(),
        uri: `spotify:track:${id}`,
        duration: faker.helpers.arrayElement(["0:44", "3:12", "4:01", "1:04:33"]),
        isExplicit: faker.datatype.boolean(),
        isPlayable: faker.datatype.boolean(),
        isSong: true,
        album: {
            id: faker.string.numeric(12),
            name: faker.commerce.productName(),
            imageUrl: "example.com/cover.png",
        },
        artists: [
            {
                id: faker.string.numeric(12),
                name: faker.commerce.productName(),
            },
            {
                id: faker.string.numeric(12),
                name: faker.commerce.productName(),
            },
        ],
    };
}

export function createRandomAlbumTrack(): AlbumTrackDto {
    const id = faker.string.numeric(12);

    return {
        id,
        playbackId: faker.string.numeric(12),
        name: faker.commerce.productName(),
        uri: `spotify:track:${id}`,
        // todo: make more random
        duration: "4:01",
        isExplicit: faker.datatype.boolean(),
        isPlayable: faker.datatype.boolean(),
        discNumber: 1,
        isSong: true,
        artists: [
            {
                id: faker.string.numeric(12),
                name: faker.commerce.productName(),
            },
            {
                id: faker.string.numeric(12),
                name: faker.commerce.productName(),
            },
        ],
    };
}

export function createRandomStreamedTrack(contextUri: string, isPaused: boolean): StreamedTrackDto {
    return {
        playbackId: faker.string.uuid(),
        name: faker.commerce.productName(),
        durationInMs: faker.number.int(),
        positionInMs: faker.number.int(),
        isPaused,
        updatedAt: faker.number.int(),
        context: {
            id: faker.string.uuid(),
            uri: contextUri,
            type: faker.helpers.arrayElement(["album", "playlist", "user"]),
            name: faker.commerce.productName(),
            isShuffled: faker.datatype.boolean(),
            repeatMode: faker.helpers.arrayElement(["off", "track", "context"]),
        },
        album: {
            id: faker.string.uuid(),
            name: faker.commerce.productName(),
        },
        artists: [],
    };
}
