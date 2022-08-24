import { createContext } from "react";

export type User = {
    id: string;
    name: string;
    market: string;
};

export const UserContext = createContext<User>({} as User);
