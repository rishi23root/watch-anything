// types for magnatic link

export type indexedMagnet = {
    title: string,
    link: string,
    comments: string,
    pubDate: string,
    category: string,
    'dc:creator': string,
    guid: string,
    torrent: {
        contentLength: string,
        infoHash: string,
        magnetURI: string
    }
}