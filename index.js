const { parse } = require('csv-parse');
const fs = require('fs');

const results = [];

fs.createReadStream('kepler_data.csv')
    .pipe(parse({
        comment: '#',
        columns: true,
    }))
    .on('data', (chunk) => {
        results.push(chunk);
    })
    .on('error', (error) => {
        console.error(error);
    })
    .on('end', () => {
        console.log(results);
        console.log('done');
    })
