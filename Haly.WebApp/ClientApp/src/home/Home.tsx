import { useQuery } from "@tanstack/react-query";
import { useAtomValue } from "jotai";

import { userNameAtom } from "../common/atoms/userAtoms";
import { theme } from "../common/theme";
import halyClient from "../halyClient";
import PageGradient from "../playlist/PageGradient";
import { CardProps } from "../ui/card/Card";
import ResizableCardGroup from "../ui/card/ResizableCardGroup";
import LoadingIndicator from "../ui/LoadingIndicator";
import Greeting from "./Greeting";

function Home() {
    const query = useQuery(["me", "feed"], () => halyClient.me.getMyFeed(), { staleTime: 1000 * 60 * 30 });
    const userName = useAtomValue(userNameAtom);

    const purple = theme.colors.dominantLikedSongs;

    const cards: CardProps[] = (query.data?.playlists || []).map((p) => {
        return {
            id: p.id,
            name: p.name,
            href: `/playlist/${p.id}`,
            imageUrl: p.imageUrl,
            subtitle: p.description ?? "",
            contextUri: `spotify:playlist:${p.id}`,
            hasRoundedImage: false,
        };
    });

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
                    href: `/album/${a.id}`,
                    imageUrl: a.imageUrl,
                    subtitle: a.artists.map((artist) => artist.name).join(", "),
                    contextUri: `spotify:album:${a.id}`,
                    hasRoundedImage: false,
                }));

                return <ResizableCardGroup key={category} title={category} items={cards} maxRows={1} />;
            })}

            <PageGradient color={purple} type="home" />
        </div>
    );
}

export default Home;
