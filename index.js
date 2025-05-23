const { parse } = require('csv-parse');
const fs = require('fs');

const habitablePlanets = [];

function isHabitablePlanet(planet) {
    return planet['koi_disposition'] === 'CONFIRMED' &&
        planet['koi_insol'] > 0.36 && planet['koi_insol'] < 1.11 && 
        planet['koi_prad'] < 1.6; 
}

fs.createReadStream('kepler_data.csv')
    .pipe(parse({
        comment: '#',
        columns: true,
    }))
    .on('data', (chunk) => {
        if(isHabitablePlanet(chunk)) {
            habitablePlanets.push(chunk);
        }
    })
    .on('error', (error) => {
        console.error(error);
    })
    .on('end', () => {
        console.log(habitablePlanets.map((planet) => {
            return planet['kepler_name'];
        }));
        console.log('Found habitable planets:', habitablePlanets.length);
    })
