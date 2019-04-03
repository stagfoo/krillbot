const concat = require('ffmpeg-concat')
const _ = require('lodash');
const shell = require('shelljs');
const fs = require('fs');
const storage  = `./tmp`;
const sessionName = Date.now();

const vaporwave = [
  `../vids/vaporwave/0.mp4`,
  `../vids/vaporwave/2.mp4`,
  `../vids/vaporwave/3.mp4`,
  `../vids/vaporwave/4.mp4`,
  `../vids/vaporwave/5.mp4`,
  `../vids/vaporwave/6.mp4`,
  `../vids/vaporwave/7.mp4`,
  `../vids/vaporwave/8.mp4`,
  `../vids/vaporwave/9.mp4`,
  `../vids/vaporwave/10.mp4`,
  `../vids/vaporwave/11.mp4`,
  `../vids/vaporwave/12.mp4`,
  `../vids/vaporwave/13.mp4`,
  `../vids/vaporwave/14.mp4`,
  `../vids/vaporwave/15.mp4`,
  `../vids/vaporwave/16.mp4`,
  `../vids/vaporwave/17.mp4`,
]
const study = [
  `../vids/study/0.mp4`,
  `../vids/study/1.mp4`,
  `../vids/study/2.mp4`,
  `../vids/study/3.mp4`,
  `../vids/study/5.mp4`,
  `../vids/study/7.mp4`,
  `../vids/study/8.mp4`,
  `../vids/study/9.mp4`,
  `../vids/study/10.mp4`,
  `../vids/study/11.mp4`,
  `../vids/study/12.mp4`,
  `../vids/study/13.mp4`,
  `../vids/study/14.mp4`,
  `../vids/study/15.mp4`,
  `../vids/study/16.mp4`,
  `../vids/study/17.mp4`,
  `../vids/study/18.mp4`,
  `../vids/study/19.mp4`,
  `../vids/study/20.mp4`,
  `../vids/study/21.mp4`,
  `../vids/study/22.mp4`,
  `../vids/study/23.mp4`,
  `../vids/study/24.mp4`,
  `../vids/study/25.mp4`,
  `../vids/study/26.mp4`,
  `../vids/study/27.mp4`,
  `../vids/study/28.mp4`,
  `../vids/study/29.mp4`,
  `../vids/study/30.mp4`,
]
const chill = [
  `../vids/chill/0.mp4`,
  `../vids/chill/1.mp4`,
  `../vids/chill/3.mp4`,
  `../vids/chill/5.mp4`,
  `../vids/chill/6.mp4`,
  `../vids/chill/7.mp4`,
  `../vids/chill/8.mp4`,
  `../vids/chill/9.mp4`,
  `../vids/chill/10.mp4`,
  `../vids/chill/11.mp4`,
  `../vids/chill/12.mp4`,
  `../vids/chill/15.mp4`,
  `../vids/chill/16.mp4`,
  `../vids/chill/17.mp4`,
  `../vids/chill/18.mp4`,
  `../vids/chill/19.mp4`,
  `../vids/chill/20.mp4`,
  `../vids/chill/21.mp4`,
  `../vids/chill/22.mp4`,
  `../vids/chill/23.mp4`,
  `../vids/chill/24.mp4`,
  `../vids/chill/25.mp4`,
  `../vids/chill/26.mp4`,
  `../vids/chill/27.mp4`,
  `../vids/chill/28.mp4`,
  `../vids/chill/29.mp4`,
  `../vids/chill/30.mp4`,
]
const lofi = [
  `../vids/lofi/0.mp4`,
  `../vids/lofi/1.mp4`,
  `../vids/lofi/3.mp4`,
  `../vids/lofi/5.mp4`,
  `../vids/lofi/7.mp4`,
  `../vids/lofi/8.mp4`,
  `../vids/lofi/9.mp4`,
  `../vids/lofi/10.mp4`,
  `../vids/lofi/11.mp4`,
  `../vids/lofi/12.mp4`,
  `../vids/lofi/15.mp4`,
  `../vids/lofi/16.mp4`,
  `../vids/lofi/17.mp4`,
  `../vids/lofi/18.mp4`,
  `../vids/lofi/19.mp4`,
  `../vids/lofi/20.mp4`,
  `../vids/lofi/21.mp4`,
  `../vids/lofi/22.mp4`,
  `../vids/lofi/23.mp4`,
]

const sourceVideoes = [
  ..._.sampleSize(lofi, 6),
  ..._.sampleSize(chill, 4),
  ..._.sampleSize(study, 2),

];
sourceVideoes.sort(() => Math.random() - 0.5);

const list = _.sampleSize(sourceVideoes, 13);
const track0Info = require(getConfigUrl(list[0]));
const track1Info = require(getConfigUrl(list[1]));
const track2Info = require(getConfigUrl(list[2]));
const track3Info = require(getConfigUrl(list[3]));
const track4Info = require(getConfigUrl(list[4]));
const track5Info = require(getConfigUrl(list[5]));
const track6Info = require(getConfigUrl(list[6]));
const track7Info = require(getConfigUrl(list[7]));
const track8Info = require(getConfigUrl(list[8]));
const track9Info = require(getConfigUrl(list[9]));
const track10Info = require(getConfigUrl(list[10]));
const track11Info = require(getConfigUrl(list[11]));




const data = `
file '${list[0]}'
file '${list[1]}'
file '${list[2]}'
file '${list[3]}'
file '${list[4]}'
file '${list[5]}'
file '${list[6]}'
file '${list[7]}'
file '${list[8]}'
file '${list[9]}'
file '${list[10]}'
file '${list[11]}'
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
${getTracklistLine(track6Info)};
${getTracklistLine(track7Info)};
${getTracklistLine(track8Info)};
${getTracklistLine(track9Info)};
${getTracklistLine(track10Info)};
${getTracklistLine(track11Info)};
***********************************
email suggestions to
krillbotdj@gmail.com
***********************************
Big thanks to all the talented soundcloud artist in this video.
`
const infoJson = {
  title: `Session ${sessionName} | Krillbot | Relaxing beach vibes and study music`,
  file: `./tmp/${sessionName}.mp4`,
  description: ytDescription
}

fs.writeFile(`${storage}/${sessionName}.json`, JSON.stringify(infoJson), function(err, jsonData) {

  fs.writeFile(`${storage}/mixList.txt`, data, function(err, data) {
    if (err) console.log(err);
    console.log("Successfully Written to File.");
    const cmd = `ffmpeg -f concat -safe 0 -i ${storage}/mixList.txt -c copy ${storage}/${sessionName}.mp4`;
    shell.exec(cmd).code;
    shell.exec(`node uploader.js ${sessionName}`);

  });
});



function getConfigUrl(url){
  return url.replace('mp4', `json`).replace('vids','configs').replace('../', './')
}

function getTracklistLine(track, prevTime){
  //images because of videoshow settings
  console.log(track);
  const trackInfo = track.config[0].images[0];
  return `${trackInfo.caption}`
  // return `00:00 => ${trackInfo.loop} ${trackInfo.caption}`
}
