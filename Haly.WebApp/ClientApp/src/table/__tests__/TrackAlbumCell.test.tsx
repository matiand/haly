// @vitest-environment happy-dom
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { expect, test } from "vitest";

import { createRandomTrack } from "../../../tests/utils/createRandomData";
import TrackAlbumCell from "../TrackAlbumCell";

test("renders a link to album page, when track is a song with id", () => {
    const track = createRandomTrack();

    render(<TrackAlbumCell track={track} />, { wrapper: MemoryRouter });
    // It's a button, because it's also draggable.
    const button = screen.getByRole("button");

    expect(button).toHaveAttribute("href", `/album/${track.album.id}`);
});

test("only renders track's album name, when track is a podcast or has no id", () => {
    const songWithoutId = {
        ...createRandomTrack(),
        id: null,
    };
    const podcast = {
        ...createRandomTrack(),
        isSong: false,
    };

    const { rerender } = render(<TrackAlbumCell track={songWithoutId} />, { wrapper: MemoryRouter });
    let name = screen.getByText(songWithoutId.album.name);
    expect(name).toBeInTheDocument();
    expect(name).not.toHaveAttribute("href");

    rerender(<TrackAlbumCell track={podcast} />);
    name = screen.getByText(podcast.album.name);
    expect(name).toBeInTheDocument();
    expect(name).not.toHaveAttribute("href");
});
