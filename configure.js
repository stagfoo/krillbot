const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('.data/db.json');
const videoshow = require('videoshow')
const mp3Duration = require('mp3-duration');
const shell = require('shelljs');
const fs = require('fs');
const ffmetadata = require("ffmetadata");


const genres = [
  {
    name:'chill',
    songs: 31,
  },

]

// {
//   name:'vaporwave',
//   songs: 0,
// },
// {
//   name:'ambient',
//   songs: 0,
// }

genres.map(genre => {
  const tracks = require(`./songs/${genre.name}/tracks.js`);
  tracks.map((track, i) => {
  const trackPath = `./songs/${genre.name}/${i}`;
  mp3Duration(`${trackPath}.mp3`, function (err, duration) {
    if (err) return console.log(err.message);
    const trackInfo = low(new FileSync(`./songs/${genre.name}/${i}.json`));
    const split = track.split(' — ');
    console.log(duration);
    trackInfo.set('info', {
      genre: genre.name,
      name: split[1],
      artist: split[0],
      duration: duration,
      slide: `slides/${i}.png`,
    }).write()
  });
  })
});