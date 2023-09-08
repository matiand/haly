import * as ToggleGroup from "@radix-ui/react-toggle-group";
import { useState } from "react";

import { styled } from "../common/theme";

export type Option = {
    name: string;
    onSelected: () => void;
    isDefault: boolean;
};

type RadioGroupProps = {
    options: Option[];
};

function RadioGroup({ options }: RadioGroupProps) {
    const defaultValue = options.find((o) => o.isDefault)?.name ?? "";
    const [value, setValue] = useState(defaultValue);

    return (
        <Root
            type="single"
            defaultValue={defaultValue}
            value={value}
            onValueChange={(newValue) => {
                if (newValue) {
                    setValue(newValue);
                    options.find((o) => o.name === newValue)!.onSelected();
                }
            }}
        >
            {options.map((o) => (
                <Item key={o.name} value={o.name}>
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

export const Item = styled(ToggleGroup.Item, {
    background: "$radioBtnBg",
    borderRadius: "32px",
    border: "none",
    color: "$white800",
    cursor: "pointer",
    flexShrink: 0,
    fontSize: "$300",
    fontWeight: 500,
    lineHeight: 1.8,
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
