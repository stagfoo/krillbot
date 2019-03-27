const concat = require('ffmpeg-concat')
const _ = require('lodash');
const shell = require('shelljs');
const fs = require('fs');
const sessionName = Date.now();
const chillVideos = [
  `../vids/chill/0.mp4`,
  `../vids/chill/1.mp4`,
  `../vids/chill/3.mp4`,
  `../vids/chill/5.mp4`,
  `../vids/chill/6.mp4`,
  // `../vids/chill/7.mp4`,
  `../vids/chill/8.mp4`,
  `../vids/chill/9.mp4`,
  `../vids/chill/10.mp4`,
  `../vids/chill/11.mp4`,
  `../vids/chill/12.mp4`,
  `../vids/chill/15.mp4`,
  `../vids/chill/16.mp4`,
  // `../vids/chill/17.mp4`,
  `../vids/chill/18.mp4`,
  `../vids/chill/19.mp4`,
  `../vids/chill/20.mp4`,
  `../vids/chill/21.mp4`,
  // `../vids/chill/22.mp4`,
  `../vids/chill/23.mp4`,
  `../vids/chill/24.mp4`,
  `../vids/chill/25.mp4`,
  `../vids/chill/26.mp4`,
  `../vids/chill/27.mp4`,
  `../vids/chill/28.mp4`,
  `../vids/chill/29.mp4`,
  `../vids/chill/30.mp4`,
];
chillVideos.sort(() => Math.random() - 0.5);

const list = _.sampleSize(chillVideos, 6);
const track0Info = require(getConfigUrl(list[0]));
const track1Info = require(getConfigUrl(list[1]));
const track2Info = require(getConfigUrl(list[2]));
const track3Info = require(getConfigUrl(list[3]));
const track4Info = require(getConfigUrl(list[4]));
const track5Info = require(getConfigUrl(list[5]));
const data = `
file '${list[0]}'
file '${list[1]}'
file '${list[2]}'
file '${list[3]}'
file '${list[4]}'
file '${list[5]}'
`


const ytDescription = `
Relaxing beach vibes and study music
Please Like and Subscribe!
Let me know what you want to hear next!

**********************************
♫ Tracklist ♫
${getTracklistLine(track0Info)};
${getTracklistLine(track1Info)};
${getTracklistLine(track2Info)};
${getTracklistLine(track3Info)};
${getTracklistLine(track4Info)};
${getTracklistLine(track5Info)};
***********************************
email suggestions to
krillbotdj@gmail.com
***********************************
Big thanks to all the talented soundcloud artist in this video.
`
console.log(ytDescription);
fs.writeFile("./tmp/mixList.txt", data, function(err, data) {
  if (err) console.log(err);
  console.log("Successfully Written to File.");
  const cmd = `ffmpeg -f concat -safe 0 -i ./tmp/mixList.txt -c copy ./tmp/${sessionName}.mp4`;
  shell.exec(cmd);
});
fs.writeFile(`./tmp/${sessionName}.txt`, ytDescription, function(err, data) {

});

function getConfigUrl(url){
  return url.replace('mp4', `json`).replace('vids','configs').replace('../', './')
}

function getTracklistLine(track, prevTime){
  //images because of videoshow settings
  const trackInfo = track.config[0].images[0];
  return `${trackInfo.caption}`
  // return `00:00 => ${trackInfo.loop} ${trackInfo.caption}`
}
