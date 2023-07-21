import { styled, theme } from "../common/theme";

const AllCardsWrapper = styled("div", {
    $$topPadding: theme.sizes.userMenuHeight,

    padding: "$$topPadding $700 $800",
});

export default AllCardsWrapper;
