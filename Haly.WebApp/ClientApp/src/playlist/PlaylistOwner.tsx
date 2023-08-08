import { useAtomValue } from "jotai";
import { Link } from "react-router-dom";

import { PlaylistMetadataDto } from "../../generated/haly";
import { userAtom } from "../common/atoms";

type PlaylistOwnerProps = {
    owner: PlaylistMetadataDto["owner"];
    isPersonalized: boolean;
};

function PlaylistOwner({ owner, isPersonalized }: PlaylistOwnerProps) {
    const user = useAtomValue(userAtom);
    const href = owner.id === user?.id || isPersonalized ? "/me" : `/user/${owner.id}`;

    if (isPersonalized) {
        return (
            <span>
                <span style={{ margin: 0 }}>{"Made for "}</span>
                <Link to={href}>
                    <strong style={{ marginLeft: "2px" }}>{user?.name}</strong>
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
