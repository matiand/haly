import { PageContext } from "../common/atoms/pageAtoms";
import { classNames, styled } from "../common/theme";
import useDraggable from "../dnd/useDraggable";

type UpperMenuTitleProps = {
    name: string;
    contextId: string;
    contextType: PageContext["type"];
};

function UpperMenuTitle({ name, contextId, contextType }: UpperMenuTitleProps) {
    const isPlaylistOrAlbum = contextType === "playlist" || contextType === "album";
    const { draggableRef, ...draggableProps } = useDraggable(
        isPlaylistOrAlbum
            ? {
                  id: "upper-menu-title",
                  data: {
                      id: contextId,
                      type: isPlaylistOrAlbum ? contextType : "streamed-track",
                      title: name,
                  },
              }
            : undefined,
    );

    return (
        <Wrapper
            ref={draggableRef}
            {...draggableProps}
            className={classNames.clampEllipsis}
            data-testid="upper-menu-title"
        >
            {name}
        </Wrapper>
    );
}

const Wrapper = styled("span", {
    fontSize: "$500",
    fontWeight: 800,
    letterSpacing: "-0.004em",
    userSelect: "none",
});

export default UpperMenuTitle;
