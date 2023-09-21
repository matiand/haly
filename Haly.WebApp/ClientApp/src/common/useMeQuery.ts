import { useQuery } from "@tanstack/react-query";
import { useSetAtom } from "jotai";
import { useAuth } from "react-oidc-context";

import { ResponseError } from "../../generated/haly";
import halyClient from "../halyClient";
import { userAtom } from "./atoms";

function useMeQuery() {
    const auth = useAuth();
    const setUser = useSetAtom(userAtom);
    const accessToken = auth.user!.access_token;

    // This is actually a PUT request, but we treat it as a query, because it's idempotent and we want
    // to have the user up to date.
    const meQuery = useQuery(
        ["me"],
        () =>
            halyClient.me
                .putCurrentUser({ body: accessToken })
                .then((user) => {
                    setUser(user);
                    return user;
                })
                .catch((err) => {
                    if (err instanceof ResponseError) {
                        if (err.response.status === 401) {
                            console.log("Token wasn't refreshed, trying to reauthenticate explicitly.");
                            auth.signinSilent();
                        }
                    }
                }),
        { refetchOnWindowFocus: "always" },
    );

    return meQuery;
}

export default useMeQuery;
