const videoshow = require('videoshow')
const mp3Duration = require('mp3-duration');
const shell = require('shelljs');
const fs = require('fs');
const ffmetadata = require("ffmetadata");

const debug = false;
const session = 2;

const config = {
  images: [
    {
    path:`./slides/${session}.png`
  }],
  audio:  `./mixes/chillsession${session}.mp3`,
  video:  `/tmp/${session}.mp4`,
  outputName: `videos/new-session1${session}.mp4`,
  options: {
    transition: true,
    transitionDuration: 1, // seconds
    videoBitrate: 1024,
    size: '1920x?',
  }
}

mp3Duration(config.audio, function (err, duration) { if (err) return console.log(err.message);
  //TIMING
  if(debug){
    config.options.loop = 20;
  } else {
    config.options.loop = duration;
  }
  //
  ffmetadata.read(config.audio, function(err, data) {
    if (err) console.error("Error reading metadata", err);
    else console.log(data);
  });

  console.log('Mix Duration:', duration);
  console.log('Videoshow Starts', new Date().getTime().toLocaleString());
  videoshow(config.images, config.options)
   .save(config.video)
    .on('start', function (command) { console.log('FFmpeg start:', new Date().getTime().toLocaleString());})
    .on('error', function (err) { console.log(`The video didn't build`); })
    .on('end', function (output) {
      console.log('end:', new Date().getTime().toLocaleString());
      const result = shell.exec(`ffmpeg -i ${config.video} -i ${config.audio} -codec copy -shortest ${config.outputName}`);
      if (result.code !== 0) {
        console.log('Adding audio failed');
      }
    })
});
