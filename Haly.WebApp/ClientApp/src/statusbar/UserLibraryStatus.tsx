import { styled } from "../common/theme";

function UserLibraryStatus() {
    // if (isLoading) return <Status>Syncing...</Status>;
    return <Status>Library synced</Status>;
}

const Status = styled("div", {});

export default UserLibraryStatus;
