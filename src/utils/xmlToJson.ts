import convert from 'xml-js';

const options = {
    compact: true,
    ignoreComment: true,
    spaces: 4,
    textKey: '_text',
    cdataKey: '_cdata',
    ignoreAttributes: true,
};
// dilute keys 
const Ditutables = [options.textKey, options.cdataKey]

// Function to clean up extra keys recursively
async function cleanUpKeys(obj: { [x: string]: any; }) {
    for (let key in obj) {
        // if value pass
        // if not value then take action 
        if (typeof obj[key] === 'object') {
            let ifExist = false;
            // check if key exist in Ditutables
            Ditutables.forEach(element => {
                // console.log(element);
                if (Object.keys(obj[key])[0] === element) {
                    ifExist = true;
                    let temp = obj[key][element];
                    delete obj[key][element];
                    obj[key] = temp.trim();
                }
            });
            if (!ifExist) {
                cleanUpKeys(obj[key]);
            }
        }
    }
}

export default async function xmlToJson(xml: string) {
    // convert xml to json
    const json = convert.xml2json(xml, options);

    // parse the data
    const parsedJson = JSON.parse(json);
    // clean up the keys

    await cleanUpKeys(parsedJson);
    // save to file 101.json
    // console.log(json);
    return parsedJson;
}

