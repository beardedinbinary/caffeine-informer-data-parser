const reqPromise = require('request-promise');
const cheerio = require('cheerio');
const jsdom = require('jsdom');
const _ = require('lodash');
const fs = require('fs');

const caffeineData = require('./caffeineDataArray');

const parseData = _.map(caffeineData, (item) => {
    return _.reduce(item, (result, value, key) => {
        let name = value[0].match(/<a [^>]+>([^<]+)<\/a>/)[1];
        caffeineSourceData = {
                name,
                fl_oz: value[1],
                totalCaffeine: value[2],
                mg_per_oz: value[3]
            }
            // console.log(caffeineSourceData);

        name = name.trim().replace(/\s+/g, '-').toLowerCase();

        const sourceObject = {
            [name]: {
                caffeineSourceData
            }
        }

        return {...result, [name]: caffeineSourceData };
    }, {});
});

console.log(parseData);

fs.writeFile('./caffeineData.json', JSON.stringify(parseData), (err) => {
    if (err) {
        console.error(err);
    }
    console.log('File Has Been Created');
});