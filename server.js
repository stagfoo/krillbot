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
const log = require('fancy-log');

const GENRE = process.argv[2] || 'chill';

for (let index = 0; index < 32; index++) {
  log(`Generated snippet videos`)
  log(`index ${index}`);
  log(`genre ${GENRE}`);
  const result = shell.exec(`node video.js './configs/${GENRE}/${index}.json'`);
  if(result.code !== 0){
    console.error(result);
  }
}


