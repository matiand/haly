import CardCollection from "../common/CardCollection";
import useDiscographyQuery from "./useDiscographyQuery";

type DiscographyProps = {
    id: string;
};

function Discography({ id }: DiscographyProps) {
    const { items, options } = useDiscographyQuery(id);

    return <CardCollection title="Discography" items={items} options={options} maxRows={2} href="discography" />;
}

export default Discography;
