
// contain all the api for the pirate bay and cerculate the url if fails in the request form one end point to another
type filterType = {
    top100: string,
    latest: string,
}

type Endpoints = {
    audio: filterType
    movie: filterType
    tvShow: filterType
    applications: {
        windows: filterType
        mac: filterType
        unix: filterType
    },
    games: filterType
    porn: filterType
    ebook: filterType
}

class PirateBayApi {
    currentActiveUrl: string;
    endpoints: (url: string) => Endpoints;
    allActiveSites: Array<string>;
    currentUrlIndex: number;
    isApiActive: boolean;
    lastChecked: number;

    constructor() {
        this.currentActiveUrl = '';
        this.endpoints = (url: string) => (
            {
                audio: {
                    top100: `${url}/rss/top100/101`,
                    latest: `${url}/rss/new/101`,
                },
                movie: {
                    top100: `${url}/rss/top100/201`,
                    latest: `${url}/rss/new/201`,
                },
                tvShow: {
                    top100: `${url}/rss/top100/205`,
                    latest: `${url}/rss/new/205`
                },
                applications: {
                    windows: {
                        top100: `${url}/rss/top100/301`,
                        latest: `${url}/rss/new/301`
                    },
                    mac: {
                        top100: `${url}/rss/top100/302`,
                        latest: `${url}/rss/new/302`
                    },
                    unix: {
                        top100: `${url}/rss/top100/303`,
                        latest: `${url}/rss/new/303`
                    }
                },
                games: {
                    top100: `${url}/rss/top100/401`,
                    latest: `${url}/rss/new/401`
                },
                porn: {
                    top100: `${url}/rss/top100/501`,
                    latest: `${url}/rss/new/501`
                },
                ebook: {
                    top100: `${url}/rss/top100/601`,
                    latest: `${url}/rss/new/601`
                },
            }
        );
        this.allActiveSites = [
            'https://thepiratebay.party',
            'https://pbays.pw',
            'https://pbays.biz',
            'https://pbays.xyz',
            'https://tpbays.xyz',
            'https://proxypirate.ml',
            'https://pirateproxy.ga',
            'https://pirateproxy.ml',
            'https://proxypirate.tk',
        ] // extracted from https://piratebayproxy.net

        this.currentUrlIndex = 0;
        this.isApiActive = false;
        this.lastChecked = -Infinity;
    }

    api = async () => {
        /**
         * return the api object
         * @return {object}           api "api object".
        */
        // check if the api is active if not active then return the api object set cache for 1 hour
        // console.log(!this.isApiActive, (Date.now() - this.lastChecked) > (1000*60*60));

        if (!this.isApiActive || (Date.now() - this.lastChecked) > (1000 * 60 * 60)) {
            // revalidate the api if the api is not active or the last checked is less than 1 hour
            console.log("revalidating... api endpoints");
            await this.updateActiveUrl()
        } else {
            console.log("api endpoints are valid using cache");
        }

        if (this.isApiActive) {
            return this.endpoints(this.currentActiveUrl) as Endpoints;
        } else {
            return {} as Endpoints;
        }
    }


    // make request to the api and check if site is active 
    checkIfActive = async (url: string) => {
        /**
        Check if the site is active by making a request to the url and check if the response contains the word PirateBay then set the currentActiveUrl to the url and return the boolean value
         * @param {string}           url "url to test".
        */
        console.log("checking :", url, "...");

        try {
            const response = await fetch(url);
            const text = await response.text();
            if (response.status == 200 || text.includes('PirateBay')) {
                // set the currentActiveUrl to the url
                this.currentActiveUrl = url;
                console.log("active");
                return true;
            } else {
                console.log("not active");
                return false;
            }
        } catch (error: any) {
            console.log("not active", error.message);
            return false;
        }
    }

    // circulate the url if the current active url is not working
    updateActiveUrl = async () => {
        /**
        find and set the active url form the allActiveSites array
        */
        // check if the current active url is working
        this.lastChecked = Date.now();
        let i = 0 // counter
        while (i <= this.allActiveSites.length) {
            // console.log(this.allActiveSites[this.currentUrlIndex]);

            // increment the counter
            i++;
            // check if the current active url is working
            const isActive = await this.checkIfActive(this.allActiveSites[this.currentUrlIndex]);
            if (isActive) {
                // set the apiisactive true if the current active url is working
                this.isApiActive = !this.isApiActive;
                break;
            } else {
                // circulate the index to the next url in the allActiveSites array 
                this.currentUrlIndex += 1;
                // check if the currentUrlIndex is greater than the length of allActiveSites
                if (this.currentUrlIndex > this.allActiveSites.length) {
                    // reset the currentUrlIndex to 0
                    this.currentUrlIndex = 0;
                }
            }
        }
        if (i > this.allActiveSites.length) {
            // set the isapiactive to false if no url is working
            this.isApiActive = false;
        }
    }
}

// export the api
export default PirateBayApi;