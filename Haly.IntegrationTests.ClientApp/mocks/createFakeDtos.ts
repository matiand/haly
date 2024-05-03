import { faker } from "@faker-js/faker";

// Ideally, we would use a library to get the real types.

faker.seed(9000);

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
    const type = faker.helpers.arrayElement(["album"]);
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

export function createFakePlaylistWithTracksDto() {
    const tracks = createFakePaginatedTracksDto(25);

    return {
        id: faker.string.alphanumeric(12),
        name: faker.music.songName(),
        imageUrl: faker.helpers.maybe(() => createFakeImageUrl("medium"), { probability: 0.95 }),
        description: faker.helpers.maybe(() => faker.lorem.sentence(4), { probability: 0.2 }),
        owner: createFakeOwner(),
        likesTotal: faker.number.int({
            min: 0,
            max: 1_000_000,
        }),
        totalDuration: tracks.totalDuration,
        tracks,
    };
}

export type PlaylistWithTracksDto = ReturnType<typeof createFakePlaylistWithTracksDto>;

export function createFakePaginatedTracksDto(total: number) {
    const items = faker.helpers
        .multiple(() => createFakeTrackDto(), { count: total })
        .map((t, idx) => ({
            ...t,
            positionInPlaylist: idx,
        }));

    return {
        limit: 200,
        offset: 0,
        total,
        items,
        totalDuration: `${faker.number.int({
            min: 0,
            max: 23,
        })}h ${faker.number.int({
            min: 0,
            max: 59,
        })}min`,
    };
}

export function createFakeTrackDto() {
    const id = faker.string.alphanumeric(12);

    return {
        id,
        playbackId: faker.datatype.boolean({ probability: 0.8 }) ? id : faker.string.alphanumeric(12),
        uri: `spotify:track:${id}`,
        name: faker.music.songName(),
        album: createFakeAlbumBriefDto(),
        artists: faker.helpers.multiple(() => createFakeArtistBriefDto(), {
            count: {
                min: 1,
                max: 3,
            },
        }),
        duration: `${faker.number.int({
            min: 0,
            max: 15,
        })}:${faker.number.int({
            min: 10,
            max: 59,
        })}`,
        addedAt: faker.date.past().toJSON(),
        isPlayable: faker.datatype.boolean({ probability: 0.9 }),
        isExplicit: faker.datatype.boolean({ probability: 0.2 }),
        isSong: true,
    };
}

export function createFakeAlbumBriefDto() {
    return {
        id: faker.string.alphanumeric(12),
        name: faker.music.songName(),
        imageUrl: faker.helpers.maybe(() => createFakeImageUrl("small"), { probability: 0.95 }),
    };
}

export function createFakeArtistDetailedDto() {
    return {
        id: faker.string.alphanumeric(12),
        name: faker.person.fullName(),
        imageUrl: faker.helpers.maybe(() => createFakeImageUrl("medium"), { probability: 0.95 }),
        genres: faker.helpers.multiple(() => faker.music.genre(), {
            count: 3,
        }),
        followersTotal: faker.number.int({
            min: 1,
            max: 1_000_000,
        }),
        isFollowed: faker.datatype.boolean(),
        topTracks: faker.helpers.multiple(() => createFakeTrackDto(), { count: 10 }),
    };
}

export type ArtistDetailedDto = ReturnType<typeof createFakeArtistDetailedDto>;

export function createFakeArtistDiscographyDto() {
    const albums = faker.helpers.multiple(() => createFakeReleaseItemDto(), {
        count: 1,
    });
    const singlesAndEps = faker.helpers.multiple(() => createFakeReleaseItemDto(), {
        count: 3,
    });

    return {
        all: albums.concat(singlesAndEps),
        albums,
        singlesAndEps,
        compilations: [],
    };
}

export type ArtistDiscographyDto = ReturnType<typeof createFakeArtistDiscographyDto>;
