export function assertUnreachable(x: never): never {
    throw new Error(`Reached an unexpected state: ${x}`);
}