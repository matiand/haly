import { useAuth } from "react-oidc-context";

const useAccessToken = () => {
    const auth = useAuth();

    const accessToken = auth.user?.access_token;
    if (!accessToken) throw new Error("User is not authenticated, access token missing");

    return accessToken;
};

export default useAccessToken;
