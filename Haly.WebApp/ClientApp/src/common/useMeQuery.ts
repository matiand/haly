import { useQuery } from "@tanstack/react-query";
import { useSetAtom } from "jotai";
import { useCallback, useEffect } from "react";
import { useAuth } from "react-oidc-context";

import { ResponseError } from "../../generated/haly";
import halyClient from "../halyClient";
import { userAtom } from "./atoms";

function useMeQuery() {
    const setUser = useSetAtom(userAtom);
    const auth = useAuth();
    const accessToken = auth.user!.access_token;

    const queryFn = useCallback(
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
        [accessToken, setUser, auth],
    );

    // This is actually a PUT request, but we treat it as a query, because it's idempotent and it's
    // easier to manage it that way.
    const meQuery = useQuery(["me"], queryFn, { refetchOnWindowFocus: "always" });

    useEffect(() => {
        if (meQuery.isFetched) {
            console.log("Token was refreshed, updating user...");
            meQuery.refetch();
        }
    }, [accessToken, meQuery]);

    return meQuery;
}

export default useMeQuery;
