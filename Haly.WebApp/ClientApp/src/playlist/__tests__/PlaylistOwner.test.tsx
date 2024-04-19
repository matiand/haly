// @vitest-environment happy-dom
import { faker } from "@faker-js/faker";
import { render, screen } from "@testing-library/react";
import { ReactNode } from "react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, test } from "vitest";

import { PlaylistWithTracksDto, PrivateUserDto } from "../../../generated/haly";
import StoreProvider, { AtomTuples, makeAtomTuple } from "../../../tests/utils/StoreProvider";
import { userAtom } from "../../common/atoms/userAtoms";
import PlaylistOwner from "../PlaylistOwner";

describe("owner is the current user", () => {
    test("anchor links to the 'me' page", () => {
        const owner = createRandomOwner();
        const user = createRandomUser(owner.id, owner.name);
        const userAtomTuple = makeAtomTuple(userAtom, user);

        render(<PlaylistOwner owner={owner} isPersonalized={false} />, {
            wrapper: AllTheProviders([userAtomTuple]),
        });

        const anchor = screen.getByRole("link");
        expect(anchor).toHaveAttribute("href", "/me");
    });
});

describe("owner is not the current user", () => {
    test("anchor links to the 'user' page", () => {
        const owner = createRandomOwner();
        const user = createRandomUser();
        const userAtomTuple = makeAtomTuple(userAtom, user);

        render(<PlaylistOwner owner={owner} isPersonalized={false} />, {
            wrapper: AllTheProviders([userAtomTuple]),
        });

        const anchor = screen.getByRole("link");
        expect(anchor).toHaveAttribute("href", `/user/${owner.id}`);
    });
});

describe("playlist is marked as personalized", () => {
    test("renders 'Made for ...' text", () => {
        const owner = createRandomOwner();
        const user = createRandomUser();
        const userAtomTuple = makeAtomTuple(userAtom, user);

        render(<PlaylistOwner owner={owner} isPersonalized />, {
            wrapper: AllTheProviders([userAtomTuple]),
        });

        const node = screen.getByText(/made for/i);
        expect(node).toBeInTheDocument();
    });
});

function AllTheProviders(atomTuples: AtomTuples) {
    return function Inner({ children }: { children: ReactNode }) {
        return (
            <MemoryRouter>
                <StoreProvider atomTuples={atomTuples}>{children}</StoreProvider>
            </MemoryRouter>
        );
    };
}

function createRandomOwner(): PlaylistWithTracksDto["owner"] {
    return {
        id: faker.string.uuid(),
        name: faker.internet.userName(),
    };
}

function createRandomUser(id?: string, name?: string): PrivateUserDto {
    return {
        id: id ?? faker.string.uuid(),
        name: name ?? faker.internet.userName(),
        isPlaybackAllowed: faker.datatype.boolean(),
        market: faker.location.countryCode(),
        likedSongsCollectionId: faker.string.numeric(),
    };
}
