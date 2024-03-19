import { router } from "@/serverTRPC/trpc";
import { indexRouter } from "./indexing";

export const appRouter = router({
    index: indexRouter
});

export type AppRouter = typeof appRouter;