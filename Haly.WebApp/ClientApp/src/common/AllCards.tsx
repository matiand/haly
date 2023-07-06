import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

import halyClient from "../halyClient";
import { CardProps } from "./Card";
import CardCollection from "./CardCollection";
import { styled, theme } from "./theme";

export function AllUserPlaylistCards() {
    const { id } = useParams();

    const query = useQuery(["user", id!, "playlists"], () => halyClient.users.getPlaylists({ userId: id! }));

    if (!query.data) return null;
    const cards: CardProps[] = (query.data ?? []).map((p) => {
        return {
            id: p.id,
            name: p.name,
            imageUrl: p.imageUrl,
            href: `/playlist/${p.id}`,
            hasRoundedImage: false,
            isPlayable: true,
        };
    });

    return (
        <Wrapper>
            <CardCollection title="Public Playlists" items={cards} maxRows={Infinity} href="" />
        </Wrapper>
    );
}

export function AllMyFollowedArtistCards() {
    const query = useQuery(["me", "following"], () => halyClient.me.getFollowedArtists());

    if (!query.data) return null;

    const cards: CardProps[] = (query.data ?? []).map((f) => {
        return {
            id: f.id,
            name: f.name,
            subtitle: "Artist",
            imageUrl: f.imageUrl,
            href: `/artist/${f.id}`,
            hasRoundedImage: true,
            isPlayable: false,
        };
    });

    return (
        <Wrapper>
            <CardCollection title="Followed Artists" items={cards} maxRows={Infinity} href="" />
        </Wrapper>
    );
}

export function AllMyTopArtistCards() {
    const query = useQuery(["me", "topArtists"], () => halyClient.me.getTopArtists());

    if (!query.data) return null;

    const cards: CardProps[] = (query.data ?? []).map((a) => {
        return {
            id: a.id,
            name: a.name,
            subtitle: a.genres[0],
            imageUrl: a.imageUrl,
            href: `/artist/${a.id}`,
            hasRoundedImage: true,
            isPlayable: true,
        };
    });

    return (
        <Wrapper>
            <CardCollection title="Top artists this month" items={cards} maxRows={Infinity} href="" />
        </Wrapper>
    );
}

const Wrapper = styled("div", {
    $$topPadding: theme.sizes.userMenuHeight,

    padding: "$$topPadding $700 $800",
});
