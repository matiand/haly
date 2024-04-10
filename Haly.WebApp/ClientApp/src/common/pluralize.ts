export function pluralize(noun: string, amount: number) {
    const amountString = amount.toLocaleString();

    return amount !== 1 ? `${amountString} ${noun}s` : `${amountString} ${noun}`;
}
