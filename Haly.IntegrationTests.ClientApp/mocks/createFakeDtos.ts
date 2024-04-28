import { faker } from "@faker-js/faker";

// Ideally, we would use a library to get the real types.

export function createFakePrivateUserDto() {
    return {
        id: faker.string.alphanumeric(12),
        name: faker.internet.displayName(),
        market: faker.location.countryCode(),
        likedSongsCollectionId: faker.string.alphanumeric(12),
        // This has to be false, because we don't want to test the playback stuff.
        isPlaybackAllowed: false,
    };
}

export type PrivateUserDto = ReturnType<typeof createFakePrivateUserDto>;

export function createFakeImageUrl(size: "small" | "medium" | "large") {
    const width = size === "small" ? 64 : size === "medium" ? 300 : 600;
    const height = size === "small" ? 64 : size === "medium" ? 300 : 600;

    return faker.image.dataUri({
        width,
        height,
    });
}

export function createFakePlaylistBriefDto(user: PrivateUserDto) {
    return {
        id: faker.string.alphanumeric(12),
        name: faker.music.songName(),
        ownerId: user.id,
        description: faker.helpers.maybe(() => faker.lorem.sentence(4), { probability: 0.2 }),
        imageUrl: faker.helpers.maybe(() => createFakeImageUrl("medium"), { probability: 0.95 }),
        thumbnailUrl: faker.helpers.maybe(() => createFakeImageUrl("small"), { probability: 0.95 }),
    };
}

export function createFakePlaylistCardDto() {
    return {
        id: faker.string.alphanumeric(12),
        name: faker.music.songName(),
        imageUrl: faker.helpers.maybe(() => createFakeImageUrl("medium"), { probability: 0.95 }),
        description: faker.helpers.maybe(() => faker.lorem.sentence(4), { probability: 0.2 }),
        owner: createFakeOwner(),
    };
}

export function createFakeOwner() {
    return {
        id: faker.string.alphanumeric(12),
        name: faker.internet.displayName(),
    };
}

export function createFakeReleaseItemDto() {
    const id = faker.string.alphanumeric(12);
    const type = faker.helpers.arrayElement(["album", "playlist"]);
    const releaseDate = faker.date.past();

    return {
        id,
        type,
        name: faker.music.songName(),
        imageUrl: createFakeImageUrl("medium"),
        uri: `spotify:${type}:${id}`,
        releaseDate: releaseDate.toDateString(),
        releaseYear: releaseDate.getFullYear(),
        artists: faker.helpers.multiple(() => createFakeArtistBriefDto(), {
            count: {
                min: 1,
                max: 3,
            },
        }),
    };
}

export function createFakeArtistBriefDto() {
    return {
        id: faker.string.alphanumeric(12),
        name: faker.person.fullName(),
    };
}

export function createFakeUserFeedDto() {
    return {
        playlists: faker.helpers.multiple(() => createFakePlaylistCardDto(), { count: 20 }),
        albumsByCategory: {
            "Recommended for today": faker.helpers.multiple(() => createFakeReleaseItemDto(), { count: 20 }),
            Essentials: faker.helpers.multiple(() => createFakeReleaseItemDto(), { count: 20 }),
        },
    };
}
