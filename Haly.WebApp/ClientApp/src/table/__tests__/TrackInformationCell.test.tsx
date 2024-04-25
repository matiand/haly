// @vitest-environment happy-dom
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { expect, test } from "vitest";

import { createRandomAlbumTrack, createRandomTrack } from "../../../tests/utils/createRandomData";
import TrackInformationCell from "../TrackInformationCell";

test("renders an explicit mark when 'showExplicitMark' prop is true", () => {
    render(<TrackInformationCell track={createRandomTrack()} showExplicitMark />, { wrapper: MemoryRouter });

    expect(screen.getByLabelText(/explicit/i)).toBeInTheDocument();
});

test("renders a link to each artist profile when 'showArtists' prop is true", () => {
    const track = createRandomTrack();

    render(<TrackInformationCell track={track} showArtists />, { wrapper: MemoryRouter });
    const artists = screen.getAllByRole("link");

    expect(artists[0]).toHaveTextContent(track.artists[0].name);
    expect(artists[0]).toHaveAttribute("href", `/artist/${track.artists[0].id}`);
    expect(artists[1]).toHaveTextContent(track.artists[1].name);
    expect(artists[1]).toHaveAttribute("href", `/artist/${track.artists[1].id}`);
});

test("renders a cover image when track has an album property", () => {
    const regularTrack = createRandomTrack();
    // Album tracks don't have an album property.
    const albumTrack = createRandomAlbumTrack();

    const { rerender } = render(<TrackInformationCell track={regularTrack} />, { wrapper: MemoryRouter });
    expect(screen.queryByRole("img")).toBeInTheDocument();

    rerender(<TrackInformationCell track={albumTrack} />);
    expect(screen.queryByRole("img")).not.toBeInTheDocument();
});
