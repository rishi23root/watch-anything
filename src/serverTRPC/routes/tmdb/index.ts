import { procedure, router } from "@/serverTRPC/trpc";
import { indexedMagnet } from "@/types/indexing";
import PirateBayApi from "@/utils/pirateBayApi";
import { getMovieDetails, getTrendingMovies, getTrendingTvShows } from "@/utils/tmdb";
import { z } from "zod";

export const tmdbRouter = router({
    search: procedure.input(z.object({
        movieName: z.string(),
    })).query(async (opts) => {
        return getMovieDetails(opts.input.movieName)
    }),
    getTrendingMovies: procedure.query(async () => {
        return getTrendingMovies()
    }),
    getTrendingTvShows: procedure.query(async () => {
        return getTrendingTvShows()
    }),
})