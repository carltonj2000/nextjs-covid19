# Corona Virus Calculations Using Next JS

The information in the `data` directory is from
[worldometers](https://www.worldometers.info/coronavirus/).

JSDOM failed parsing the HTML from the above site and cheerio did not.
Used cheerio to parse and then feed clean HTML into JSDOM.
The JSDOM AST is easier for data scraping than cheerio.
