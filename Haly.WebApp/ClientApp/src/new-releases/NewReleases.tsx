import { useAtomValue } from "jotai/index";
import { useState } from "react";

import { NewReleasesJobDto } from "../../generated/haly";
import { artistsLeftAtom, NewReleasesFilter } from "../common/atoms/newReleasesAtom";
import { styled } from "../common/theme";
import Button from "../ui/Button";
import RadioGroup, { Option } from "../ui/RadioGroup";
import NewReleaseItems from "./NewReleaseItems";

type NewReleasesProps = {
    job: NewReleasesJobDto;
};

function NewReleases({ job }: NewReleasesProps) {
    const artistsLeft = useAtomValue(artistsLeftAtom);
    const [filter, setFilter] = useState<NewReleasesFilter>("all");

    const options: Option[] = [
        {
            name: "All",
            isDefault: true,
            onSelected: () => {
                setFilter("all");
            },
        },
        {
            name: "Albums",
            isDefault: false,
            onSelected: () => {
                setFilter("albums");
            },
        },
        {
            name: "Singles and EPs",
            isDefault: false,
            onSelected: () => {
                setFilter("singles");
            },
        },
    ];

    const filteredItems = filter === "all" ? job.all : filter === "albums" ? job.albums : job.singlesAndEps;

    return (
        <Wrapper>
            <Controls>
                {job && <RadioGroup options={options} />}

                <Button
                    variant="square"
                    type="button"
                    disabled={artistsLeft > 0}
                    onClick={() => console.log("not click")}
                >
                    Check What&#39;s New
                </Button>
            </Controls>

            <NewReleaseItems items={filteredItems} artistsLeft={artistsLeft} />
        </Wrapper>
    );
}

const Wrapper = styled("div", {
    padding: "$800 0",
});

const Controls = styled("div", {
    display: "flex",
    marginBottom: "$800",

    "& > [role=group]": {
        marginBottom: "initial",
    },

    "& > button": {
        marginInlineStart: "auto",

        "&[disabled]": {
            opacity: 0.66,
        },
    },
});

export default NewReleases;
