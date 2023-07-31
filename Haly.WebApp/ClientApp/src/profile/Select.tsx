import { ChangeEventHandler, useState } from "react";

import { styled } from "../common/theme";

type SelectProps = {
    id: string;
    label: string;
    onChange: (newOption: string) => void;
    options: string[];
    defaultOption: string;
};

function Select({ id, label, onChange, options, defaultOption }: SelectProps) {
    const [option, setOption] = useState(defaultOption);

    const onSelectChange: ChangeEventHandler<HTMLSelectElement> = (e) => {
        const newOption = e.currentTarget.value;

        setOption(newOption);
        onChange(newOption);
    };

    return (
        <Wrapper>
            <label htmlFor={id}>{label}</label>
            <select id={id} value={option} onChange={onSelectChange}>
                {options.map((o) => (
                    <option key={o} value={o}>
                        {o}
                    </option>
                ))}
            </select>
        </Wrapper>
    );
}

const Wrapper = styled("div", {
    fontSize: "$350",
    fontWeight: 500,

    "& select": {
        borderRadius: "4px",
        padding: "$200",
        paddingRight: "$800",
    },
});

export default Select;
