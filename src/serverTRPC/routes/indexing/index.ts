import { procedure, router } from "@/serverTRPC/trpc";
import { indexedMagnet } from "@/types/indexing";
import PirateBayApi from "@/utils/pirateBayApi";

const pirateBay = new PirateBayApi(process.env.NODE_ENV === "development" ? 1 : 0);

const getData = async (url: string | indexedMagnet[], limit: number = -1) => {
    // console.log(url);
    const indexes = await pirateBay.getIndexing(url, limit)
    // now on the basis of title make a request to get the thumbnail api
    // https://www.themoviedb.org/
    return indexes
}

const limit = 15

export const indexRouter = router({
    movie: router({
        top100: procedure.query(async () => {
            const endpoints = await pirateBay.api();
            if (!endpoints) {
                return null
            }
            return await getData(endpoints?.movie.top100, limit)
        }),
        latest: procedure.query(async () => {
            const endpoints = await pirateBay.api();
            if (!endpoints) {
                return null
            }
            return await getData(endpoints?.movie.latest, limit)
        })
    }),
    tvShow: router({
        top100: procedure.query(async () => {
            const endpoints = await pirateBay.api();
            if (!endpoints) {
                return null
            }
            return await getData(endpoints?.tvShow.top100, limit)
        }),
        latest: procedure.query(async () => {
            const endpoints = await pirateBay.api();
            if (!endpoints) {
                return null
            }
            return await getData(endpoints?.tvShow.latest, limit)
        })
    }),
    audio: router({
        top100: procedure.query(async () => {
            const endpoints = await pirateBay.api();
            if (!endpoints) {
                return null
            }
            return await getData(endpoints?.audio.top100, limit)
        }),
        latest: procedure.query(async () => {
            const endpoints = await pirateBay.api();
            if (!endpoints) {
                return null
            }
            return await getData(endpoints?.audio.latest, limit)
        })
    }),
    games: router({
        top100: procedure.query(async () => {
            const endpoints = await pirateBay.api();
            if (!endpoints) {
                return null
            }
            return await getData(endpoints?.games.top100, limit)
        }),
        latest: procedure.query(async () => {
            const endpoints = await pirateBay.api();
            if (!endpoints) {
                return null
            }
            return await getData(endpoints?.games.latest, limit)
        })
    }),
    applications: router({
        windows: router({
            top100: procedure.query(async () => {
                const endpoints = await pirateBay.api();
                if (!endpoints) {
                    return null
                }
                return await getData(endpoints?.applications.windows.top100, limit)
            }),
            latest: procedure.query(async () => {
                const endpoints = await pirateBay.api();
                if (!endpoints) {
                    return null
                }
                return await getData(endpoints?.applications.windows.latest, limit)
            })
        }),
        mac: router({
            top100: procedure.query(async () => {
                const endpoints = await pirateBay.api();
                if (!endpoints) {
                    return null
                }
                return await getData(endpoints?.applications.mac.top100, limit)
            }),
            latest: procedure.query(async () => {
                const endpoints = await pirateBay.api();
                if (!endpoints) {
                    return null
                }
                return await getData(endpoints?.applications.mac.latest, limit)
            })
        }),
        unix: router({
            top100: procedure.query(async () => {
                const endpoints = await pirateBay.api();
                if (!endpoints) {
                    return null
                }
                return await getData(endpoints?.applications.unix.top100, limit)
            }),
            latest: procedure.query(async () => {
                const endpoints = await pirateBay.api();
                if (!endpoints) {
                    return null
                }
                return await getData(endpoints?.applications.unix.latest, limit)
            })
        })
    }),
    ebook: router({
        top100: procedure.query(async () => {
            const endpoints = await pirateBay.api();
            if (!endpoints) {
                return null
            }
            return await getData(endpoints?.ebook.top100, limit)
        }),
        latest: procedure.query(async () => {
            const endpoints = await pirateBay.api();
            if (!endpoints) {
                return null
            }
            return await getData(endpoints?.ebook.latest, limit)
        })
    }),
    porn: router({
        top100: procedure.query(async () => {
            const endpoints = await pirateBay.api();
            if (!endpoints) {
                return null
            }
            return await getData(endpoints?.porn.top100, limit)
        }),
        latest: procedure.query(async () => {
            const endpoints = await pirateBay.api();
            if (!endpoints) {
                return null
            }
            return await getData(endpoints?.porn.latest, limit)
        })
    }),
});