const videoshow = require('videoshow')
const mp3Duration = require('mp3-duration');
const shell = require('shelljs');
const fs = require('fs');
const ffmetadata = require("ffmetadata");
const debug = true;
const session = require('./configs/chill/0.json');


const videoConfig = {
  images: session.config[0].images,
  audio:  session.config[0].audio,
  video:  `/tmp/${Date.now()}.mp4`,
  outputName: session.config[0].video,
  options: {
    videoBitrate: 1024,
    size: '1920x?',
    captionDelay: 350,
    transition: false,
    subtitleStyle: {
      Fontname: 'chappa',
      Fontsize: '32',
      PrimaryColour: '0xFFFFFF',
      Bold: '2',
      Italic: '0',
      BorderStyle: '0',
      Outline: '2',
      Shadow: '0',
      Alignment: '3', // left, middle, right
      MarginL: '40',
      MarginR: '60',
      MarginV: '40'
    }
  }
}
  if(debug){
    videoConfig.images[0].loop = 5;
  }

  videoshow(videoConfig.images, videoConfig.options)
   .save(videoConfig.video)
    .on('start', function (command) { console.log('FFmpeg start:', new Date().getTime().toLocaleString());})
    .on('error', function (err) { console.log(`The video didn't build`); console.log(err) })
    .on('end', function (output) {
      console.log('end:', new Date().getTime().toLocaleString());
      const result = shell.exec(`ffmpeg -i ${videoConfig.video} -i ${videoConfig.audio} -codec copy -shortest ${videoConfig.outputName}`);
      if (result.code !== 0) {
        console.log('Adding audio failed');
      }
    })
