const videoshow = require('videoshow')
const mp3Duration = require('mp3-duration');
const shell = require('shelljs');
const fs = require('fs');

//CONFIG
const session = 1;
const images = [`./slides/${session}.png`];
const audio = `./mixes/${session}.mp3`;
const video = `/tmp/${session}.mp4`;
const outputName = `videos/session${session}.mp4`;
const options = {
  loop: 5, // seconds
  transition: true,
  transitionDuration: 1, // seconds
  videoBitrate: 1024,
  size: '1920x?',
}

mp3Duration(audio, function (err, duration) { if (err) return console.log(err.message);
  options.loop = duration;
  console.log('Mix Duration:', duration);
  console.log('Videoshow Starts', new Date().getTime().toLocaleString());
videoshow(images, options)
  .save(video)
  .on('start', function (command) { console.log('FFmpeg start:', new Date().getTime().toLocaleString());})
  .on('error', function (err) { console.log(`The video didn't build`); })
  .on('end', function (output) {
    console.log('end:', new Date().getTime().toLocaleString());
    const result = shell.exec(`ffmpeg -i ${video} -i ${audio} -codec copy -shortest ${outputName}`);
    if (result.code !== 0) {
      console.log('Adding audio failed');
    }
  })
});
