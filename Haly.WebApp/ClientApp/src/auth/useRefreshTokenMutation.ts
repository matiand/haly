import { useMutation } from "@tanstack/react-query";
import { useAuth } from "react-oidc-context";

function useRefreshTokenMutation() {
    const auth = useAuth();

    return useMutation({
        mutationFn: () =>
            auth.signinSilent().then(() => {
                console.log("Token refreshed");
            }),
    });
}

export default useRefreshTokenMutation;
