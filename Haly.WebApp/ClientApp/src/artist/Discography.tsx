import CardCollection from "../common/CardCollection";
import useDiscographyQuery from "./useDiscographyQuery";

type DiscographyProps = {
    artistId: string;
};

function Discography({ artistId }: DiscographyProps) {
    const { items, options, filter } = useDiscographyQuery(artistId);

    const href = `discography/${filter}`;

    return <CardCollection title="Discography" items={items} options={options} maxRows={2} href={href} />;
}

export default Discography;
