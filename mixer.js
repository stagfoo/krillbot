var audioconcat = require('audioconcat')

var songs = [
  './songs/1.mp3',
  './songs/2.mp3',
  './songs/3.mp3',
]

audioconcat(songs)
  .concat('./mixes/1-half.mp3')
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
