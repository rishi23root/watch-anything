// contain all the api for the pirate bay and cerculate the url if fails in the request form one end point to another

import { indexingData } from "@/JSONapiData/indexing";
import { Endpoints, filterType, indexedMagnet } from "@/types/indexing";
import xmlToJson from "./xmlToJson";

const cacheHours = 1

class PirateBayApi {
    currentActiveUrl: string;
    allActiveSites: Array<string>;
    currentUrlIndex: number;
    isApiActive: boolean;
    lastChecked: number;
    isTesting: boolean;
    jsonData: typeof indexingData;

    constructor(mode?: number) {
        /**
         * @param {number}           
         *  mode "0 production mode".
         *  mode "1 testing mode".
         */
        this.currentActiveUrl = '';
        this.allActiveSites = [
            'https://pbays.pw',
            'https://pbays.biz',
            'https://pbays.xyz',
            'https://tpbays.xyz',
            'https://proxypirate.ml',
            'https://pirateproxy.ga',
            'https://pirateproxy.ml',
            'https://proxypirate.tk',
            'https://Prbay.top',
            'https://prbay.online',
            'https://thepiratebay10.xyz/',
            'https://thepiratebay.party',

        ] // extracted from https://piratebayproxy.net

        this.currentUrlIndex = 0;
        this.isApiActive = false;
        this.lastChecked = -Infinity;
        this.isTesting = mode === 1 ? true : false;
        this.jsonData = {} as typeof indexingData;
        if (this.isTesting) {
            this.jsonData = indexingData;
        }
    }

    endpoints = (url: string) => (
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

    api = async () => {
        /**
         * return the api object
         * @return {object}           api "api object".
        */


        if (this.isTesting) {
            return this.jsonData;
        }
        else {
            // check if the api is active if not active then return the api object set cache for 1 hour

            if (!this.isApiActive || (Date.now() - this.lastChecked) > (cacheHours * 1000 * 60 * 60)) {
                // revalidate the api if the api is not active or the last checked is less than 1 hour
                console.log("revalidating... api endpoints");
                await this.updateActiveUrl()
                if (!this.isApiActive && this.currentActiveUrl == "") {
                    console.log("[not activated]");
                }
            } else {
                console.log("[active]: ", this.currentActiveUrl, "using cache");
            }

            if (this.isApiActive) {
                return this.endpoints(this.currentActiveUrl) as Endpoints<filterType<string>>;
            }
            console.log('[not activated] no active url');
            return undefined;
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
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'User-Agent': 'Mozilla/5.0'
                },

            });
            const text = await response.text();

            if (response.status == 200 && text.includes('The Pirate Bay')) {
                // set the currentActiveUrl to the url
                this.currentActiveUrl = url;
                console.log("[active]: " + url);
                return true;
            } else {
                console.log("[not active]: ", url);
                return false;
            }
        } catch (error: any) {
            console.log("[failed]", url, error.message);
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
            console.log(i, this.allActiveSites.length, this.allActiveSites[this.currentUrlIndex]);

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
                if (this.currentUrlIndex > this.allActiveSites.length - 1) {
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

    getIndexing = async (url: string | indexedMagnet[], limit: number = -1) => {
        /**
         * @param {string}           url "url to use for request".
         * @param {number}           limit "limit the number of data".
         * @return {Array<indexedMagnet>}           return the array of indexedMagnet.
        // extract the required data from the api and parse it to json
        */

        if (this.isTesting) {
            return url as indexedMagnet[] // here url is data for testing only

        }

        const response = await fetch(url as string, {
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
}

// export the api
export default PirateBayApi;