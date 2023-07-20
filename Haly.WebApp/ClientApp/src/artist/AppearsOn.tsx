import CardCollection from "../common/CardCollection";
import useAppearsOnQuery from "./useAppearsOnQuery";

type AppearsOnProps = {
    artistId: string;
};

function AppearsOn({ artistId }: AppearsOnProps) {
    const { items, options } = useAppearsOnQuery(artistId);

    return <CardCollection title="Appears On" items={items} options={options} maxRows={2} href="appearances" />;
}

export default AppearsOn;
