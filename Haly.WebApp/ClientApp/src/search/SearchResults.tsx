import { useQuery } from "@tanstack/react-query";

import { SearchType } from "../../generated/haly";
import { SearchOption } from "../common/atoms/searchAtoms";
import { styled } from "../common/theme";
import halyClient from "../halyClient";
import { CardProps } from "../ui/card/Card";
import ResizableCardGroup from "../ui/card/ResizableCardGroup";
import EmptyState from "../ui/EmptyState";

type SearchResultsProps = {
    q: string;
    option: Exclude<SearchOption, "library">;
};

function SearchResults({ q, option }: SearchResultsProps) {
    const { data } = useQuery(
        [
            "search",
            "spotify",
            {
                q,
                option,
            },
        ],
        () =>
            halyClient.search.searchSpotify({
                query: q,
                queryType: optionToQueryType(option),
            }),
        {
            enabled: Boolean(q),
            keepPreviousData: option === "albums" || option === "artists" || option === "playlists",
        },
    );

    if (!q) return <EmptyState title="Start typing to see results" />;

    if (!data) return null;

    const albums = (data.albums ?? []).map(
        (a): CardProps => ({
            id: a.id,
            name: a.name,
            uri: `spotify:album:${a.id}`,
            href: `/album/${a.id}`,
            subtitle: [a.releaseYear, a.artists.map((a) => a.name).join(", ")],
            imageUrl: a.imageUrl,
        }),
    );

    const artists = (data.artists ?? []).map(
        (a): CardProps => ({
            id: a.id,
            name: a.name,
            uri: `spotify:artist:${a.id}`,
            href: `/artist/${a.id}`,
            subtitle: "Artist",
            imageUrl: a.imageUrl,
        }),
    );

    const playlists = (data.playlists ?? []).map(
        (p): CardProps => ({
            id: p.id,
            name: p.name,
            uri: `spotify:playlist:${p.id}`,
            href: `/playlist/${p.id}`,
            subtitle: `By ${p.owner.name}`,
            imageUrl: p.imageUrl,
        }),
    );

    if (option === "all") {
        return (
            <Wrapper>
                {artists.length > 0 && <ResizableCardGroup title="Artists" items={artists} maxRows={1} />}
                {albums.length > 0 && <ResizableCardGroup title="Albums" items={albums} maxRows={1} />}
                {playlists.length > 0 && <ResizableCardGroup title="Playlists" items={playlists} maxRows={1} />}
            </Wrapper>
        );
    }

    return (
        <Wrapper>
            {albums.length > 0 && <ResizableCardGroup items={albums} maxRows={Infinity} />}
            {artists.length > 0 && <ResizableCardGroup items={artists} maxRows={Infinity} />}
            {playlists.length > 0 && <ResizableCardGroup items={playlists} maxRows={Infinity} />}
        </Wrapper>
    );
}

function optionToQueryType(option: Exclude<SearchOption, "library">) {
    switch (option) {
        case "albums":
            return SearchType.Album;
        case "artists":
            return SearchType.Artist;
        case "playlists":
            return SearchType.Playlist;
        case "songs":
            return SearchType.Track;
        default:
            return SearchType.All;
    }
}

const Wrapper = styled("div", {});

export default SearchResults;
