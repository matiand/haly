import { styled } from "@stitches/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSetAtom } from "jotai";
import { useForm } from "react-hook-form";
import { LuAlertCircle } from "react-icons/lu";

import { UpdatePlaylistDetailsRequestBody } from "../../../generated/haly";
import { modalAtom } from "../../common/atoms/modalAtoms";
import { GetMyPlaylistsQueryKey, GetPlaylistQueryKey } from "../../common/queryKeys";
import halyClient from "../../halyClient";
import Button from "../../ui/Button";
import Modal from "./Modal";

type Inputs = {
    name: string;
    description: string;
};

type EditPlaylistDetailsModalProps = {
    id: string;
} & Inputs;

function EditPlaylistDetailsModal({ id, name, description }: EditPlaylistDetailsModalProps) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>({ mode: "onChange" });
    const setModal = useSetAtom(modalAtom);

    const queryClient = useQueryClient();
    const updatePlaylistDetails = useMutation(
        (body: UpdatePlaylistDetailsRequestBody) =>
            halyClient.playlists.updatePlaylistDetails({
                playlistId: id,
                updatePlaylistDetailsRequest: {
                    name: body.name,
                    description: body.description,
                },
            }),
        {
            onSuccess: () => {
                queryClient.invalidateQueries(GetPlaylistQueryKey(id));
                queryClient.invalidateQueries(GetMyPlaylistsQueryKey);
            },
        },
    );

    const errorMessage = errors.name?.message || errors.description?.message;

    const onSubmit = handleSubmit((data) => {
        updatePlaylistDetails.mutate({
            name: data.name,
            description: data.description.replaceAll("\n", " "),
        });
        setModal(null);
    });

    return (
        <Modal title="Edit details" onClose={() => setModal(null)}>
            <ModalForm autoComplete="off" autoCapitalize="off" autoCorrect="off" spellCheck="false" onSubmit={onSubmit}>
                {errorMessage && (
                    <Alert role="alert">
                        <span aria-hidden>
                            <LuAlertCircle />
                        </span>
                        <p>{errorMessage}</p>
                    </Alert>
                )}

                <InputGroup>
                    <label htmlFor="playlist.name">Name</label>
                    <input
                        id="playlist.name"
                        defaultValue={name}
                        placeholder="Add a name"
                        maxLength={100}
                        {...register("name", {
                            required: {
                                value: true,
                                message: "Playlist name is required.",
                            },
                            maxLength: 100,
                        })}
                    />
                </InputGroup>

                <InputGroup>
                    <label htmlFor="playlist.description">Description</label>
                    <textarea
                        id="playlist.description"
                        defaultValue={description}
                        placeholder="Add an optional description"
                        maxLength={300}
                        {...register("description", {
                            maxLength: 300,
                            required: {
                                value: description.length > 0,
                                message: "Existing description cannot be removed.",
                            },
                        })}
                    />
                </InputGroup>

                <div>
                    <Button variant="round" type="submit">
                        Save
                    </Button>
                </div>
            </ModalForm>
        </Modal>
    );
}

const ModalForm = styled("form", {
    display: "flex",
    flexDirection: "column",
    gap: "$600",
    justifyContent: "center",
    marginTop: "$700",

    button: {
        background: "$black800",
        color: "$white800",
    },

    "& > :last-child": {
        marginLeft: "auto",
    },
});

const Alert = styled("div", {
    alignItems: "center",
    background: "$danger400",
    borderRadius: "4px",
    color: "$white800",
    display: "flex",
    gap: "$400",
    fontSize: "$300",
    fontWeight: 500,
    padding: "$400 $500",

    "& span, svg": {
        height: "20px",
        width: "20px",
    },
});

const InputGroup = styled("div", {
    minWidth: "450px",
    position: "relative",

    label: {
        fontSize: "$200",
        fontWeight: 700,
        position: "absolute",
        left: "calc($500 - 4px)",
        opacity: 0,
        transition: "opacity .2s",
        top: "calc(-$500 + 2px)",
    },

    "&:focus-within > label": {
        opacity: 1,
    },

    "& input, textarea": {
        background: "rgba(0, 0, 0, 0.10)",
        border: "1px solid transparent",
        borderRadius: "4px",
        fontSize: "$300",
        fontWeight: 500,
        height: "40px",
        padding: "0 $500",
        width: "100%",

        "&:focus": {
            border: "1px solid $white600",
            outline: "none",
        },
    },

    "& textarea": {
        height: "8rem",
        fontSize: "$200",
        padding: "$500",
        resize: "none",
    },
});

export default EditPlaylistDetailsModal;
