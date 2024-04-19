import { faker } from "@faker-js/faker";

import { StreamedTrackDto } from "../../src/common/atoms/playbackAtoms";

function createRandomStreamedTrack(contextUri: string, isPaused: boolean): StreamedTrackDto {
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

export default createRandomStreamedTrack;
