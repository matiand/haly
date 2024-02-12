import { useQueryClient } from "@tanstack/react-query";

import { ArtistDiscographyDto } from "../../generated/haly";
import { GetArtistDiscographyQueryKey } from "../common/queryKeys";
import ResizableCardGroup from "../ui/card/ResizableCardGroup";
import useAppearsOnQuery from "./useAppearsOnQuery";

type AppearsOnProps = {
    artistId: string;
};

function AppearsOn({ artistId }: AppearsOnProps) {
    const queryClient = useQueryClient();
    const { items, options, filter } = useAppearsOnQuery(artistId);

    const discographyQuery = queryClient.getQueryState(GetArtistDiscographyQueryKey(artistId));
    const discography = discographyQuery?.data as ArtistDiscographyDto | undefined;

    // Don't render anything if there is no discography.
    if (!discography) return null;

    const href = `appears-on/${filter}`;

    return <ResizableCardGroup title="Appears On" items={items} options={options} maxRows={1} href={href} />;
}

export default AppearsOn;
