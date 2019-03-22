const audioconcat = require('audioconcat')
const ffmetadata = require("ffmetadata");
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
 const adapter = new FileSync('.data/db.json')
const db = low(adapter)

var genre = "chill"
var songs = [
  './songs/chill/0.mp3',
  './songs/chill/1.mp3',
  './songs/chill/2.mp3',
  './songs/chill/3.mp3',
  './songs/chill/4.mp3',
]

audioconcat(songs)
  .concat(`./mixes/${genre}session2.mp3`)
  .on('start', function (command) {
    console.log('ffmpeg process started:', command)
  })
  .on('error', function (err, stdout, stderr) {
    console.error('Error:', err)
    console.error('ffmpeg stderr:', stderr)
  })
  .on('end', function (output) {
    console.error('Audio created in:', output)
  })
