const videoshow = require('videoshow')
var mp3Duration = require('mp3-duration');
const fs = require('fs');

var images = [
  'https://cdn.glitch.com/312385d8-9433-4670-9143-73640144b7cc%2FDesktop.png?1553029663735',
]
var audio = './mixes/1.mp3';
const options = {
  fps: 25,
  loop: 10, // seconds
  transition: true,
  transitionDuration: 1, // seconds
  videoBitrate: 1024,
  videoCodec: 'libx264',
  size: '1920x?',
  audioBitrate: '128k',
  audioChannels: 2,
  format: 'mp4',
  pixelFormat: 'yuv420p'
}

mp3Duration(audio, function (err, duration) {
  if (err) return console.log(err.message);
  // options.loop = duration;
  console.log(duration);

videoshow(images, options)
  .save('videos/1.mp4')
  .on('start', function (command) {
    console.log('ffmpeg process started:', command)
  })
  .on('error', function (err) {
    console.error('Error:', err)
  })
  .on('end', function (output) {
    console.log('Video created in:', output);
  })
});
