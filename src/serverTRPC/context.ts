import { currentUser } from '@clerk/nextjs';

/**
 * Creates context for an incoming request
 * @link https://trpc.io/docs/v11/context
 */
export async function createContext() {
    const user = await currentUser();
    return {
        id: user?.id,
    };
}

export type Context = Awaited<ReturnType<typeof createContext>>;
