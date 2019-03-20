var shell = require('shelljs');
const videoName = `video.mp4`;
const musicTrack = `mixes/1.mp3`;
const outputName = `vidoes/mixes1.mp4`
// Run external tool synchronously
if (shell.exec(`ffmpeg -i ${videoName} -i ${musicTrack} -codec copy -shortest ${outputName}`).code !== 0) {

}
