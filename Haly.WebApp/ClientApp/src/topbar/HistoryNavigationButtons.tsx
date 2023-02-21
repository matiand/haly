import { AccessibleIcon } from "@radix-ui/react-accessible-icon";
import { VscChevronLeft, VscChevronRight } from "react-icons/all";

import { styled } from "../common/theme";

function HistoryNavigationButtons() {
    return (
        <ButtonContainer>
            <Button type="button" title="Go back" onClick={() => console.log("Go Back")}>
                <AccessibleIcon label="Go back">
                    <VscChevronLeft className="history-icon" />
                </AccessibleIcon>
            </Button>
            <Button type="button" title="Go forward" onClick={() => console.log("Go Forward")}>
                <AccessibleIcon label="Go forward">
                    <VscChevronRight className="history-icon" />
                </AccessibleIcon>
            </Button>
        </ButtonContainer>
    );
}

const ButtonContainer = styled("div", {
    display: "flex",
    gap: "$600",

    "& .history-icon": {
        width: "$historyNavIconSize",
        height: "$historyNavIconSize",
        color: "$white",
    },
});

const Button = styled("button", {
    width: "$historyNavBtnSize",
    height: "$historyNavBtnSize",
    display: "inline-flex",
    justifyContent: "center",
    alignItems: "center",
    background: "$black500",
    padding: "0",
    border: "none",
    borderRadius: "50%",
    cursor: "pointer",
});

export default HistoryNavigationButtons;
