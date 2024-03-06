import { router } from "@/serverTRPC/trpc";

export const appRouter = router({
});

export type AppRouter = typeof appRouter;