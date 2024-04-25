import { useQuery } from "@tanstack/react-query";

import { GetArtistDiscographyQueryKey } from "../common/queryKeys";
import halyClient from "../halyClient";
import ResizableCardGroup from "../ui/card/ResizableCardGroup";
import useAppearsOnQuery from "./useAppearsOnQuery";

type AppearsOnProps = {
    artistId: string;
};

function AppearsOn({ artistId }: AppearsOnProps) {
    const { items, options, filter } = useAppearsOnQuery(artistId);

    const { data: discography } = useQuery({
        queryKey: GetArtistDiscographyQueryKey(artistId),
        queryFn: () => halyClient.artists.getArtistDiscography({ id: artistId! }),
    });

    // Don't render anything if there is no discography.
    if (!discography) return null;

    const href = `appears-on/${filter}`;

    return <ResizableCardGroup title="Appears On" items={items} options={options} maxRows={1} href={href} showEmpty />;
}

export default AppearsOn;
