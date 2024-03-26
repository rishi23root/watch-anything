import { router } from "@/serverTRPC/trpc";
import { indexRouter } from "./indexing";
import { tmdbRouter } from "./tmdb";

export const appRouter = router({
    index: indexRouter,
    tmdb: tmdbRouter,
});

export type AppRouter = typeof appRouter;