import { Atom, Provider } from "jotai";
import { useHydrateAtoms } from "jotai/utils";
import { ReactNode } from "react";

// There is a bug in TypeScript that prevents us from inferring the types of 'useHydrateAtoms'
// correctly (https://github.com/microsoft/TypeScript/issues/57351).
// We have to use out own types as a workaround.

// export type AtomTuples = Parameters<typeof useHydrateAtoms>[0];
export type AtomTuples = [Atom<unknown>, unknown][];

type StoreProviderProps = {
    atomTuples: AtomTuples;
    children?: ReactNode;
};

function StoreProvider({ atomTuples, children }: StoreProviderProps) {
    return (
        <Provider>
            <HydrateAtoms atomTuples={atomTuples}>{children}</HydrateAtoms>
        </Provider>
    );
}

function HydrateAtoms({ atomTuples, children }: StoreProviderProps) {
    // @ts-expect-error https://github.com/microsoft/TypeScript/issues/57351
    useHydrateAtoms(atomTuples);

    return children;
}

// type AtomValue<T> = T extends WritableAtom<infer U, unknown[], unknown> ? U : never;
type AtomValue<T> = T extends Atom<infer U> ? U : never;
export function makeAtomTuple<T>(atom: T, value: AtomValue<T>): [T, AtomValue<T>] {
    return [atom, value];
}

export default StoreProvider;
