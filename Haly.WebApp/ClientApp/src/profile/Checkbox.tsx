import { Indicator,Root } from "@radix-ui/react-checkbox";
import { useState } from "react";

import { styled } from "../common/theme";

type CheckboxProps = {
    id: string;
    label: string;
    defaultValue: boolean;
    onChange: (newValue: boolean) => void;
};

function Checkbox({ id, label, defaultValue, onChange }: CheckboxProps) {
    const [isChecked, setIsChecked] = useState(defaultValue);

    const onClick = () => {
        const newValue = !isChecked;

        setIsChecked(newValue);
        onChange(newValue);
    };

    return (
        <Wrapper>
            <label htmlFor={id}>{label}</label>

            <Root id={id} checked={isChecked} onCheckedChange={onClick}>
                <Indicator />
            </Root>
        </Wrapper>
    );
}

const Wrapper = styled("div", {
    $$size: "28px",

    "& button": {
        background: "inherit",
        border: "2px solid $white800",
        borderRadius: "4px",
        height: "$$size",
        width: "$$size",

        "&:hover": {
            cursor: "pointer",
        },

        "&[data-state='checked']": {
            background: "$primary400",
            border: "1px solid $primary500",
        },
    },
});

export default Checkbox;
