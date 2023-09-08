import ResizableCardGroup from "../ui/card/ResizableCardGroup";
import useAppearsOnQuery from "./useAppearsOnQuery";

type AppearsOnProps = {
    artistId: string;
};

function AppearsOn({ artistId }: AppearsOnProps) {
    const { items, options, filter } = useAppearsOnQuery(artistId);

    const href = `appears-on/${filter}`;

    return <ResizableCardGroup title="Appears On" items={items} options={options} maxRows={1} href={href} />;
}

export default AppearsOn;
