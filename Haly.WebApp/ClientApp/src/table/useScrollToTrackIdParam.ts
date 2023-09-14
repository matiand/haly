import { useSearchParams } from "react-router-dom";

function useScrollToTrackIdParam() {
    const [searchParams] = useSearchParams();

    return searchParams.get("scrollToTrackId");
}

export default useScrollToTrackIdParam;
