import { MenuItem } from "@szhsin/react-menu";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

import halyClient from "../../halyClient";

type AddToQueueMenuItemProps = {
    collectionUri?: string;
    trackUris?: string[];
};

function AddToQueueMenuItem({ collectionUri, trackUris }: AddToQueueMenuItemProps) {
    const addToQueue = useMutation(
        (params: AddToQueueMenuItemProps) => halyClient.player.addToQueue({ addToQueueRequest: params }),
        {
            onSuccess: () => {
                toast("Added to queue.");
            },
        },
    );

    const onClick = () =>
        addToQueue.mutate({
            collectionUri,
            trackUris,
        });

    return <MenuItem onClick={onClick}>Add to queue</MenuItem>;
}

export default AddToQueueMenuItem;
