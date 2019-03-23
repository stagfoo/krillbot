const concat = require('ffmpeg-concat')

const genre = 'vaporwave'
// concat 3 mp4s together using 2 500ms directionalWipe transitions
concat({
  output: `./tmp/${Date.now()}.mp4`,
  videos: [
    `./vids/vaporwave/0.mp4`,
    `./vids/vaporwave/1.mp4`,
  ],
  transition: {
    name: 'fade',
    duration: 500
  }
})
