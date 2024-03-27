import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useAuth } from "react-oidc-context";

function useRefreshTokenMutation() {
    const auth = useAuth();

    return useMutation({
        mutationFn: () => auth.signinSilent(),
        onSuccess: () => {
            console.log("Token refreshed");
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });
}

export default useRefreshTokenMutation;
