const mm = require('music-metadata');
const util = require('util')
const path = require('path');
const fs = require('fs');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('db.json');
const videoshow = require('videoshow')
const shell = require('shelljs');
const ffmetadata = require("ffmetadata");


//joining path of directory
const GENRE = 'chill';

const directoryPath = `./songs/${GENRE}`;
//passsing directoryPath and callback function
fs.readdir(directoryPath, function (err, files) {
    //handling error
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    }
    //listing all files using forEach
    files.forEach(function (file) {
      const fileName = file.split('.')[0];
      const audioPath = `${directoryPath}/${file}`;
      const configFile = low(new FileSync(`./configs/${GENRE}/${fileName}.json`));

      getMeta(audioPath)
        .then((m) => {
          handleMetaData(m, configFile, getPaths(fileName, audioPath));
        })
        .catch( err => handleError);
    });
});


function getMeta(path) {
  return mm.parseFile(path, {native: true})
}

function handleMetaData(metadata, configFile, paths){
  console.log(metadata);
  configFile.set('config', [{
    images: [
      {
      path: paths.slide,
      caption: `${metadata.common.title} - ${metadata.common.albumartist}`,
      loop: metadata.format.duration
    },
  ],
  video: paths.video,
  audio: paths.audio
  }]).write()
}

function handleError() {
  console.error(err.message);
}

function getPaths(count, audio) {
  return {
    video: `./vids/${GENRE}/${count}.mp4`,
    slide: `./slides/${GENRE}/${count}.png`,
    audio
  }
}
