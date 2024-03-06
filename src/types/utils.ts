
// any record type with coustom generic template
export type keyValue<T> = { [key: string]: T }

// tipicle json format
export type JsonType = keyValue<any>

export type customParams = {
    _s?: {
        [key: string]: string | string[] | undefined
    }
}

// search params types
export type searchParamType = keyValue<string | string[] | undefined> | customParams & {
    error?: string
    redirectPage?: string
}

// nextjs page params 
export type PageProps = {
    params: keyValue<string>;
    searchParams: searchParamType;
};


export type privateData = keyValue<any>