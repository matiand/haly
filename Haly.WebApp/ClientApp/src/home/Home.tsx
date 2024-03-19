import { useQuery } from "@tanstack/react-query";
import { useAtomValue, useSetAtom } from "jotai";
import { useEffect } from "react";
import { useDocumentTitle } from "usehooks-ts";

import { pageContextAtom } from "../common/atoms/pageAtoms";
import { userNameAtom } from "../common/atoms/userAtoms";
import halyClient from "../halyClient";
import { CardProps } from "../ui/card/Card";
import ResizableCardGroup from "../ui/card/ResizableCardGroup";
import LoadingIndicator from "../ui/LoadingIndicator";
import Greeting from "./Greeting";

function Home() {
    useDocumentTitle("Home");

    const query = useQuery(["me", "feed"], () => halyClient.me.getMyFeed(), { staleTime: 1000 * 60 * 30 });
    const userName = useAtomValue(userNameAtom);
    const setPageContext = useSetAtom(pageContextAtom);

    const cards: CardProps[] = (query.data?.playlists || []).map((p) => {
        return {
            id: p.id,
            name: p.name,
            uri: `spotify:playlist:${p.id}`,
            href: `/playlist/${p.id}`,
            imageUrl: p.imageUrl,
            subtitle: p.description ?? "",
        };
    });

    useEffect(() => {
        setPageContext({
            type: "basic",
            data: {
                id: "home",
                name: "Home",
            },
        });

        return () => setPageContext(null);
    }, [setPageContext]);

    if (!userName || !query.data) return <LoadingIndicator />;

    const albumsByCategory = query.data.albumsByCategory;

    return (
        <div>
            <Greeting date={new Date()} />

            <ResizableCardGroup title={`Made for ${userName}`} items={cards} maxRows={1} />

            {Object.entries(albumsByCategory).map(([category, albums]) => {
                const cards: CardProps[] = albums.map((a) => ({
                    id: a.id,
                    name: a.name,
                    uri: `spotify:album:${a.id}`,
                    href: `/album/${a.id}`,
                    subtitle: a.artists.map((artist) => artist.name).join(", "),
                    imageUrl: a.imageUrl,
                }));

                return <ResizableCardGroup key={category} title={category} items={cards} maxRows={1} />;
            })}
        </div>
    );
}

export default Home;
