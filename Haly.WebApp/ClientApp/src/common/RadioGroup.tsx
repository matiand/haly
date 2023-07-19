import * as ToggleGroup from "@radix-ui/react-toggle-group";
import { useState } from "react";

import { styled } from "./theme";

export type Option = {
    name: string;
    value: string;
    onSelected: () => void;
};

type RadioGroupProps = {
    options: Option[];
};

function RadioGroup({ options }: RadioGroupProps) {
    const defaultValue = options[0].value;
    const [value, setValue] = useState(defaultValue);

    return (
        <Root
            type="single"
            value={value}
            onValueChange={(newValue) => {
                if (newValue) {
                    setValue(newValue);
                    options.find((o) => o.value === newValue)!.onSelected();
                }
            }}
        >
            {options.map((o) => (
                <Item key={o.value} value={o.value}>
                    {o.name}
                </Item>
            ))}
        </Root>
    );
}

const Root = styled(ToggleGroup.Root, {
    display: "flex",
    gap: "$400",
    marginBottom: "$800",
});

const Item = styled(ToggleGroup.Item, {
    background: "$radioBtnBg",
    borderRadius: "32px",
    border: "none",
    color: "$white800",
    cursor: "pointer",
    flexShrink: 0,
    fontSize: "$300",
    fontWeight: 500,
    lineHeight: 2,
    padding: "$200 $500",
    transition: "background 0.2s ease",

    "&[aria-checked=true]": {
        background: "$white800",
        color: "$black800",

        "&:active": {
            background: "$white500",
        },
    },

    "&[aria-checked=false]": {
        "&:hover": {
            background: "$radioBtnBgHover",
        },

        "&:active": {
            background: "$radioBtnBgPress",
        },
    },
});

export default RadioGroup;
