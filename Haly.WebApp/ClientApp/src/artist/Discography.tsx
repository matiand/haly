import ResizableCardGroup from "../common/ResizableCardGroup";
import useDiscographyQuery from "./useDiscographyQuery";

type DiscographyProps = {
    artistId: string;
};

function Discography({ artistId }: DiscographyProps) {
    const { items, options, filter } = useDiscographyQuery(artistId);

    const href = `discography/${filter}`;

    return <ResizableCardGroup title="Discography" items={items} options={options} maxRows={2} href={href} />;
}

export default Discography;
