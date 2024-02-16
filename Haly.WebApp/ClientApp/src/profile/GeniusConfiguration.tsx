import { useAtom } from "jotai";
import { useForm } from "react-hook-form";

import { persistedGeniusTokenAtom, persistedWithGeniusIntegrationAtom } from "../common/atoms/playbackAtoms";
import { styled } from "../common/theme";
import Checkbox from "./Checkbox";

type Inputs = {
    token: string;
};

function GeniusConfiguration() {
    const [withGeniusIntegration, setWithGeniusIntegration] = useAtom(persistedWithGeniusIntegrationAtom);
    const [geniusToken, setGeniusToken] = useAtom(persistedGeniusTokenAtom);
    const { register, handleSubmit } = useForm<Inputs>({
        defaultValues: { token: geniusToken },
    });

    const onCheckboxChange = (newValue: boolean) => {
        setWithGeniusIntegration(newValue);
    };

    const onSubmit = handleSubmit((data) => {
        setGeniusToken(data.token);
    });

    return (
        <>
            <Checkbox
                id="genius.c1"
                label="Enable Genius integration"
                defaultValue={withGeniusIntegration}
                onChange={onCheckboxChange}
            />

            {withGeniusIntegration && (
                <Form onSubmit={onSubmit} autoComplete="off">
                    <label htmlFor="genius.i1">Client Access Token</label>
                    <input
                        id="genius.i1"
                        {...register("token", {
                            required: true,
                            onChange: (e) => setGeniusToken(e.target.value),
                        })}
                    />
                </Form>
            )}
        </>
    );
}

const Form = styled("form", {
    display: "flex",
    flexFlow: "column nowrap",
    marginTop: "$700",

    "&& > label": {
        fontFamily: "monospace",
        fontSize: "$100",
        fontWeight: 500,
        letterSpacing: "-0.04em",
        marginBottom: "$200",
        textTransform: "uppercase",
    },

    "&& > input": {
        border: "none",
        borderRadius: "4px",
        fontSize: "$200",
        padding: "$200",
        maxWidth: "70%",
    },
});

export default GeniusConfiguration;
