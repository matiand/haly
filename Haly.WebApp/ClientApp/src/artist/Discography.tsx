import CardCollection from "../common/CardCollection";
import useDiscographyQuery from "./useDiscographyQuery";

type DiscographyProps = {
    artistId: string;
};

function Discography({ artistId }: DiscographyProps) {
    const { items, options } = useDiscographyQuery(artistId);

    return <CardCollection title="Discography" items={items} options={options} maxRows={2} href="discography" />;
}

export default Discography;
