import { AlbumBriefDto } from "../../../generated/haly";
import { styled } from "../../common/theme";
import EmptyCoverImage from "../EmptyCoverImage";

type BlockImageProps = {
    imageUrl: AlbumBriefDto["imageUrl"];
    size?: number;
};

const defaultSize = 40;

function BlockImage({ imageUrl, size }: BlockImageProps) {
    const width = size ?? defaultSize;
    const height = size ?? defaultSize;

    return imageUrl ? (
        <Image alt="" src={imageUrl} loading="eager" width={width} height={height} />
    ) : (
        <EmptyCoverImage type="block" size={size} />
    );
}

const Image = styled("img", {
    borderRadius: "4px",
    flex: "0 0 auto",
});

export default BlockImage;
