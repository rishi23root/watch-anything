import { TRPCError, initTRPC } from "@trpc/server";
import { Context } from './context';
import { clerkClient } from "@clerk/nextjs";

const t = initTRPC.context<Context>().create();
// export const { createCallerFactory } = t;
export const router = t.router;
export const procedure = t.procedure;
export const privateProcedure = procedure.use(async (opts) => {
    const { ctx } = opts;

    // check clerk id is present in the context and verify it 
    try {
        if (ctx.id) {
            const user = await clerkClient.users.getUser(ctx.id);
            // create log of the use request 
        } else {
            // if any one of these is missing, throw an error
            throw Error("User not found");
        }
    } catch (error) {
        throw new TRPCError({ code: 'UNAUTHORIZED' });
    }
    return opts.next({
        ctx
    });
});