import React from "react";

import { styled } from "../common/theme";

type EmptyStateProps = {
    title: string;
    icon?: React.ReactNode;
    description?: string;
};

function EmptyState({ title, icon, description }: EmptyStateProps) {
    return (
        <Section>
            {icon && <span aria-hidden>{icon}</span>}

            <h1>{title}</h1>
            {description && <p>{description}</p>}
        </Section>
    );
}

const Section = styled("section", {
    alignItems: "center",
    display: "flex",
    flexFlow: "column nowrap",
    marginTop: "72px",

    h1: {
        fontSize: "$600",
        fontWeight: 700,
        margin: "$600 0 $400",
        padding: 0,
    },

    p: {
        color: "$white700",
        fontSize: "$300",
        fontWeight: 500,
    },

    "span, svg": {
        height: "40px",
        width: "40px",
    },
});

export default EmptyState;
