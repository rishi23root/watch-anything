// types for magnatic link

export type indexedMagnet = {
    title: string,
    link: string,
    comments: string,
    pubDate: string,
    category: string,
    'dc:creator': string | object,
    guid: string,
    torrent: {
        contentLength?: string,
        infoHash?: string,
        magnetURI?: string
    }
}

export type filterType<T> = {
    top100: T,
    latest: T,
}

export type Endpoints<T> = {
    audio: T
    movie: T
    tvShow: T
    applications: {
        windows: T
        mac: T
        unix: T
    },
    games: T
    porn: T
    ebook: T
}