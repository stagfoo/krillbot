const videoshow = require('videoshow')
const mp3Duration = require('mp3-duration');
const shell = require('shelljs');
const fs = require('fs');
const ffmetadata = require("ffmetadata");
const log = require('fancy-log');

const debug = process.argv[3] === '-d' ? true : false;
if(process.argv[2].length === 0){
  console.log('No config given');
  return;
}
console.log(process.argv);
const session = require(process.argv[2]);


const videoConfig = {
  images: session.config[0].images,
  audio:  session.config[0].audio,
  video:  `/tmp/${Date.now()}.mp4`,
  outputName: session.config[0].video,
  options: {
    videoBitrate: 1024,
    size: '1920x?',
    captionDelay: 0,
    captionStart: 0,
    transitionDuration: 0,
    transition: false,
    subtitleStyle: {
      Fontname: 'chappa',
      Fontsize: '32',
      PrimaryColour: '0xFFFFFF',
      BackColour: "0xFF1A3B",
      Bold: '2',
      Italic: '0',
      BorderStyle: '0',
      Outline: '0',
      Shadow: '0',
      Alignment: '3', // left, middle, right
      MarginL: '40',
      MarginR: '60',
      MarginV: '40'
    }
  }
}
  if(debug){  videoConfig.images[0].loop = 5; }

  videoshow(videoConfig.images, videoConfig.options)
   .save(videoConfig.video)
    .on('start', function (command) { log('FFmpeg start');})
    .on('error', function (err) { log(`The video didn't build`); log(err) })
    .on('end', function (output) {
      log('FFmpeg Finished');
      const result = shell.exec(`ffmpeg -i ${videoConfig.video} -i ${videoConfig.audio} -codec copy -shortest ${videoConfig.outputName}`);
      if (result.code !== 0) {
        log('Adding audio failed');
      }
    })

