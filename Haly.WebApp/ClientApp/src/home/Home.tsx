import { useQuery } from "@tanstack/react-query";
import { useAtomValue } from "jotai";

import { userAtom } from "../common/atoms";
import { CardProps } from "../common/Card";
import LoadingIndicator from "../common/LoadingIndicator";
import ResizableCardGroup from "../common/ResizableCardGroup";
import { theme } from "../common/theme";
import halyClient from "../halyClient";
import PageGradient from "../playlist/PageGradient";
import Greeting from "./Greeting";

function Home() {
    const query = useQuery(["me", "feed"], () => halyClient.me.getUserFeed(), { staleTime: 1000 * 60 * 30 });
    const user = useAtomValue(userAtom);

    const purple = theme.colors.dominantLikedSongs;

    const cards: CardProps[] = (query.data?.playlists || []).map((p) => {
        return {
            id: p.id,
            name: p.name,
            href: `/playlist/${p.id}`,
            imageUrl: p.imageUrl,
            subtitle: p.description ?? "",
            isPlayable: true,
            hasRoundedImage: false,
        };
    });

    if (!user || !query.data) return <LoadingIndicator />;

    const albumsByCategory = query.data.albumsByCategory;

    return (
        <div>
            <Greeting date={new Date()} />

            <ResizableCardGroup title={`Made for ${user.name}`} items={cards} maxRows={1} />

            {Object.entries(albumsByCategory).map(([category, albums]) => {
                const cards: CardProps[] = albums.map((a) => ({
                    id: a.id,
                    name: a.name,
                    href: `/album/${a.id}`,
                    imageUrl: a.imageUrl,
                    subtitle: a.artists.map((artist) => artist.name).join(", "),
                    isPlayable: false,
                    hasRoundedImage: false,
                }));

                return <ResizableCardGroup key={category} title={category} items={cards} maxRows={1} />;
            })}

            <PageGradient color={purple} type="home" />
        </div>
    );
}

export default Home;
