import { styled } from "../common/theme";
import HeartButton from "../ui/HeartButton";
import useIsAlbumInLibrary from "./useIsAlbumInLibrary";

type AlbumHeartButtonProps = {
    albumId: string;
};

function AlbumHeartButton({ albumId }: AlbumHeartButtonProps) {
    const { isLoading, isOn } = useIsAlbumInLibrary(albumId);

    if (isLoading) return <EmptySpace />;

    return (
        <HeartButton
            // Force rerender when the state was modified outside of the component (e.g. using a menu).
            key={isOn ? 1 : 0}
            params={{
                id: albumId,
                type: "album",
            }}
            state={isOn}
        />
    );
}

const EmptySpace = styled("div", {
    height: "32px",
    width: "32px",
});

export default AlbumHeartButton;
