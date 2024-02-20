import EmptyState from "../ui/EmptyState";

type LibrarySearchResults = {
    q: string;
};

function LibrarySearchResults({ q }: LibrarySearchResults) {
    if (!q) return null;

    return <EmptyState title="Not implemented yet" />;
}

export default LibrarySearchResults;
