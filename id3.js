const mm = require('music-metadata');
const util = require('util')

mm.parseFile('./songs/chill/chill.mp3', {native: true})
  .then( metadata => {
    console.log(metadata.common.title);
    console.log(metadata.common.albumartist);
    console.log(metadata.format.duration);
  })
  .catch( err => {
    console.error(err.message);
  });