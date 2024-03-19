import { useQuery } from "@tanstack/react-query";

import { SearchType } from "../../generated/haly";
import { SearchOption } from "../common/atoms/searchAtoms";
import { styled } from "../common/theme";
import halyClient from "../halyClient";
import BasicTable from "../table/basic/BasicTable";
import { CardProps } from "../ui/card/Card";
import ResizableCardGroup from "../ui/card/ResizableCardGroup";
import EmptyState from "../ui/EmptyState";
import TopSearchPicks from "./TopSearchPicks";

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
                <TopSearchPicks
                    artist={data.artists?.at(0)}
                    album={data.albums?.at(0)}
                    playlist={data.playlists?.at(0)}
                    songs={(data.tracks ?? []).slice(0, 5)}
                />

                <ResizableCardGroup title="Artists" items={artists} maxRows={1} />
                <ResizableCardGroup title="Albums" items={albums} maxRows={1} />
                <ResizableCardGroup title="Playlists" items={playlists} maxRows={1} />
            </Wrapper>
        );
    }

    if (option === "songs") {
        return <BasicTable items={data.tracks ?? []} withHeader withAlbumCell showArtists />;
    }

    return (
        <Wrapper>
            <ResizableCardGroup items={albums} maxRows={Infinity} />
            <ResizableCardGroup items={artists} maxRows={Infinity} />
            <ResizableCardGroup items={playlists} maxRows={Infinity} />
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
