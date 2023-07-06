import { useQuery } from "@tanstack/react-query";
import { useLocation, useParams } from "react-router-dom";

import halyClient from "../halyClient";
import CardCollection from "./CardCollection";
import { styled, theme } from "./theme";

function AllCards() {
    const { id } = useParams();
    const location = useLocation();
    const lastPathSegment = location.pathname.split("/").at(-1);

    const query = useAllCardsQuery(id!, lastPathSegment!);

    if (!query.data) return null;

    if (lastPathSegment === "playlists") {
        return (
            <Wrapper>
                <CardCollection title="Public Playlists" items={query.data} maxRows={Infinity} />
            </Wrapper>
        );
    }

    return null;
}

const useAllCardsQuery = (id: string, resource: string) => {
    const queryKey = ["users", id, resource];
    let queryFn = () => halyClient.users.getPlaylists({ userId: id! });

    if (resource === "artists") {
        queryFn = () => halyClient.me.getFollowedArtists();
    }

    return useQuery(queryKey, queryFn);
};

const Wrapper = styled("div", {
    $$topPadding: theme.sizes.userMenuHeight,

    padding: "$$topPadding $700 $800",
});

export default AllCards;
