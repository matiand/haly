import { useAtomValue } from "jotai";
import { Link } from "react-router-dom";

import { PlaylistWithTracksDto } from "../../generated/haly";
import { userIdAtom, userNameAtom } from "../common/atoms/userAtoms";

type PlaylistOwnerProps = {
    owner: PlaylistWithTracksDto["owner"];
    isPersonalized: boolean;
};

function PlaylistOwner({ owner, isPersonalized }: PlaylistOwnerProps) {
    const userId = useAtomValue(userIdAtom);
    const userName = useAtomValue(userNameAtom);

    const href = owner.id === userId || isPersonalized ? "/me" : `/user/${owner.id}`;

    if (isPersonalized) {
        return (
            <span>
                <span style={{ margin: 0 }}>{"Made for "}</span>
                <Link to={href}>
                    <strong style={{ marginLeft: "2px" }}>{userName}</strong>
                </Link>
            </span>
        );
    }

    return (
        <span>
            <Link to={href}>
                <strong>{owner.name}</strong>
            </Link>
        </span>
    );
}

export default PlaylistOwner;
