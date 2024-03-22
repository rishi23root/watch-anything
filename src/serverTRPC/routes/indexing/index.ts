import { procedure, router } from "@/serverTRPC/trpc";
import { indexedMagnet } from "@/types";
import PirateBayApi from "@/utils/pirateBayApi";
import xmlToJson from "@/utils/xmlToJson";


const pirateBay = new PirateBayApi();

const getIndexing = async (url: string, limit: number = -1) => {
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Accept': 'application/xml',
            'User-Agent': 'Mozilla/5.0'
        },
    });
    const text = await response.text();
    if (text.includes('<meta name="viewport"')) {
        return [] as Array<indexedMagnet>;
    }

    const myJson = await xmlToJson(text)
    // check if the data is empty
    if (myJson.rss.channel.item.length === 0) {
        return [] as Array<indexedMagnet>;
    } else {

        if (limit === -1) {
            return myJson.rss.channel.item as Array<indexedMagnet>;
        }
        // console.log(myJson.rss.channel.item.slice(0, 1)[0]);

        return myJson.rss.channel.item.slice(0, limit) as Array<indexedMagnet>;
    }
}

const getData = async (url: string, limit: number = -1) => {
    const indexes = await getIndexing(url, limit)
    // now on the basis of title make a request to get the thumbnail api
    // https://www.themoviedb.org/

    return indexes
}

const limit = 15

export const indexRouter = router({
    movie: router({
        top100: procedure.query(async () => {
            const endpoints = await pirateBay.api();
            return await getData(endpoints?.tvShow.top100, limit)
        }),
        latest: procedure.query(async () => {
            const endpoints = await pirateBay.api();
            return await getData(endpoints?.tvShow.latest, limit)
            // return [{
            //     title: 'Photographer S01E06 1080p HEVC x265-MeGusta',
            //     link: 'magnet:?xt=urn:btih:163DF4B0ED2F91E0B55887D2B695C4235C2A60E4&dn=Photographer+S01E06+1080p+HEVC+x265-MeGusta',
            //     comments: 'https://thepiratebay.party/torrent/74885681',
            //     pubDate: 'Tue, 19 Mar 2024 23:08:31 +0100',
            //     category: 'Video / TV shows',
            //     'dc:creator': 'TvTeam',
            //     guid: 'https://thepiratebay.party/torrent/74885681/',
            //     torrent: {
            //         contentLength: '696342061',
            //         infoHash: '163DF4B0ED2F91E0B55887D2B695C4235C2A60E4',
            //         magnetURI: 'magnet:?xt=urn:btih:163DF4B0ED2F91E0B55887D2B695C4235C2A60E4&amp;dn=Photographer+S01E06+1080p+HEVC+x265-MeGusta'
            //     }
            // },
            // {
            //     title: 'Photographer S01E06 1080p HEVC x265-MeGusta',
            //     link: 'magnet:?xt=urn:btih:163DF4B0ED2F91E0B55887D2B695C4235C2A60E4&dn=Photographer+S01E06+1080p+HEVC+x265-MeGusta',
            //     comments: 'https://thepiratebay.party/torrent/74885681',
            //     pubDate: 'Tue, 19 Mar 2024 23:08:31 +0100',
            //     category: 'Video / TV shows',
            //     'dc:creator': 'TvTeam',
            //     guid: 'https://thepiratebay.party/torrent/74885681/',
            //     torrent: {
            //         contentLength: '696342061',
            //         infoHash: '163DF4B0ED2F91E0B55887D2B695C4235C2A60E4',
            //         magnetURI: 'magnet:?xt=urn:btih:163DF4B0ED2F91E0B55887D2B695C4235C2A60E4&amp;dn=Photographer+S01E06+1080p+HEVC+x265-MeGusta'
            //     }
            // },
            // {
            //     title: 'Photographer S01E06 1080p HEVC x265-MeGusta',
            //     link: 'magnet:?xt=urn:btih:163DF4B0ED2F91E0B55887D2B695C4235C2A60E4&dn=Photographer+S01E06+1080p+HEVC+x265-MeGusta',
            //     comments: 'https://thepiratebay.party/torrent/74885681',
            //     pubDate: 'Tue, 19 Mar 2024 23:08:31 +0100',
            //     category: 'Video / TV shows',
            //     'dc:creator': 'TvTeam',
            //     guid: 'https://thepiratebay.party/torrent/74885681/',
            //     torrent: {
            //         contentLength: '696342061',
            //         infoHash: '163DF4B0ED2F91E0B55887D2B695C4235C2A60E4',
            //         magnetURI: 'magnet:?xt=urn:btih:163DF4B0ED2F91E0B55887D2B695C4235C2A60E4&amp;dn=Photographer+S01E06+1080p+HEVC+x265-MeGusta'
            //     }
            // },
            // {
            //     title: 'Photographer S01E06 1080p HEVC x265-MeGusta',
            //     link: 'magnet:?xt=urn:btih:163DF4B0ED2F91E0B55887D2B695C4235C2A60E4&dn=Photographer+S01E06+1080p+HEVC+x265-MeGusta',
            //     comments: 'https://thepiratebay.party/torrent/74885681',
            //     pubDate: 'Tue, 19 Mar 2024 23:08:31 +0100',
            //     category: 'Video / TV shows',
            //     'dc:creator': 'TvTeam',
            //     guid: 'https://thepiratebay.party/torrent/74885681/',
            //     torrent: {
            //         contentLength: '696342061',
            //         infoHash: '163DF4B0ED2F91E0B55887D2B695C4235C2A60E4',
            //         magnetURI: 'magnet:?xt=urn:btih:163DF4B0ED2F91E0B55887D2B695C4235C2A60E4&amp;dn=Photographer+S01E06+1080p+HEVC+x265-MeGusta'
            //     }
            // }]
        })
    }),
    tvShow: router({
        top100: procedure.query(async () => {
            const endpoints = await pirateBay.api();
            return await getData(endpoints?.tvShow.top100, limit)
        }),
        latest: procedure.query(async () => {
            const endpoints = await pirateBay.api();
            return await getData(endpoints?.tvShow.latest, limit)
        })
    }),
    audio: router({
        top100: procedure.query(async () => {
            const endpoints = await pirateBay.api();
            return await getData(endpoints?.audio.top100, limit)
        }),
        latest: procedure.query(async () => {
            const endpoints = await pirateBay.api();
            return await getData(endpoints?.audio.latest, limit)
        })
    }),
    games: router({
        top100: procedure.query(async () => {
            const endpoints = await pirateBay.api();
            return await getData(endpoints?.games.top100, limit)
        }),
        latest: procedure.query(async () => {
            const endpoints = await pirateBay.api();
            return await getData(endpoints?.games.latest, limit)
        })
    }),
    applications: router({
        windows: router({
            top100: procedure.query(async () => {
                const endpoints = await pirateBay.api();
                return await getData(endpoints?.applications.windows.top100, limit)
            }),
            latest: procedure.query(async () => {
                const endpoints = await pirateBay.api();
                return await getData(endpoints?.applications.windows.latest, limit)
            })
        }),
        mac: router({
            top100: procedure.query(async () => {
                const endpoints = await pirateBay.api();
                return await getData(endpoints?.applications.mac.top100, limit)
            }),
            latest: procedure.query(async () => {
                const endpoints = await pirateBay.api();
                return await getData(endpoints?.applications.mac.latest, limit)
            })
        }),
        unix: router({
            top100: procedure.query(async () => {
                const endpoints = await pirateBay.api();
                return await getData(endpoints?.applications.unix.top100, limit)
            }),
            latest: procedure.query(async () => {
                const endpoints = await pirateBay.api();
                return await getData(endpoints?.applications.unix.latest, limit)
            })
        })
    }),
});