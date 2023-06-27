import { useContext } from "react";

import { styled } from "../common/theme";
import { UserContext } from "../me/UserContext";
import UserLibraryStatus from "./UserLibraryStatus";

function StatusBar() {
    const user = useContext(UserContext);

    return (
        <Footer>
            <div>{user.name}</div>
            <UserLibraryStatus />
        </Footer>
    );
}

const Footer = styled("footer", {
    alignItems: "center",
    display: "flex",
    color: "$white800",
    fontSize: "$300",
    padding: "$200 $600",

    "> *": {
        paddingRight: "$800",
    },
});

export default StatusBar;
