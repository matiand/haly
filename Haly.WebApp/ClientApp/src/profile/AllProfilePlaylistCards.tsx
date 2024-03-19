import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

import halyClient from "../halyClient";
import { CardProps } from "../ui/card/Card";
import ResizableCardGroup from "../ui/card/ResizableCardGroup";
import {useDocumentTitle} from "usehooks-ts";
import {useAtomValue} from "jotai";
import {lastVisitedProfileNameAtom } from "../common/atoms/pageAtoms";

function AllProfilePlaylistCards() {
    const { id } = useParams();

    const lastVisitedProfileName = useAtomValue(lastVisitedProfileNameAtom);
    const query = useQuery(["user", id!, "playlists"], () => halyClient.users.getPlaylists({ userId: id! }));
    
    const documentTitle = lastVisitedProfileName ? `${lastVisitedProfileName} - Playlists` : "User Playlists";
    useDocumentTitle(documentTitle);

    if (!query.data) return null;
    
    const cards: CardProps[] = (query.data ?? []).map((p) => {
        return {
            id: p.id,
            name: p.name,
            uri: `spotify:playlist:${p.id}`,
            href: `/playlist/${p.id}`,
            imageUrl: p.imageUrl,
            description: p.description ?? "",
        };
    });

    return <ResizableCardGroup title="Public Playlists" items={cards} maxRows={Infinity} href="" />;
}

export default AllProfilePlaylistCards;
