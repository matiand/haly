import { formatDistanceToNowStrict } from "date-fns";

import { styled } from "../common/theme";

type NewReleasesDescriptionProps = {
    jobFinishedAt: Date;
};

function NewReleasesDescription({ jobFinishedAt }: NewReleasesDescriptionProps) {
    const distance = formatDistanceToNowStrict(jobFinishedAt, { addSuffix: true });

    return (
        <Paragraph>
            The latest songs from artists that you follow, updated every Friday. Last checked: {distance}.
        </Paragraph>
    );
}

const Paragraph = styled("p", {
    color: "$white400",
    fontSize: "$300",
    fontWeight: 500,
    userSelect: "none",
});

export default NewReleasesDescription;
