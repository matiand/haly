import CardCollection from "../common/CardCollection";
import useAppearsOnQuery from "./useAppearsOnQuery";

type AppearsOnProps = {
    id: string;
};

function AppearsOn({ id }: AppearsOnProps) {
    const { items, options } = useAppearsOnQuery(id);

    return <CardCollection title="Appears On" items={items} options={options} maxRows={2} href="appearances" />;
}

export default AppearsOn;
