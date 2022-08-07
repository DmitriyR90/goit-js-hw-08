import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

player.on('timeupdate', throttle(getCurrentTime, 1000));

function getCurrentTime(data) {
  localStorage.setItem('videoplayer-current-time', data.seconds);
}

let currentTime = localStorage.getItem('videoplayer-current-time');

if (currentTime) {
  player.setCurrentTime(currentTime);
}
