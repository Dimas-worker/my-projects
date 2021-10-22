import playList from './playList.js';

const playBtn = document.querySelector('.play');
const prevBtn = document.querySelector('.play-prev');
const nextBtn = document.querySelector('.play-next');

const volumeIcon = document.querySelector('.volume-icon');
const timeBar = document.querySelector('.progress__time');
const progressVolume = document.querySelector('.player__volume');
const progressBar = document.querySelector('.player__bar');
const trackName = document.querySelector('.player-track');

const trackList = document.querySelector('.play-list');

//creat list

playList.forEach(el => {
  let li = document.createElement('li');
  let span = document.createElement('span');
  span.classList.add('play-item_icon');
  li.classList.add('play-item');
  li.textContent = el.title;
  trackList.append(li);
  li.append(span);
});

const trackLists = document.querySelectorAll('.play-item');

let playNum = 0;
const trackNumber = {
  'Aqua Caelestis': 0,
  'River Flows In You': 1,
  'Ennio Morricone': 2,
  'Summer Wind': 3
};

const audio = new Audio();
audio.src = `${playList[playNum].src}`;
trackName.textContent = `${playList[playNum].title}`;

function activeCurTrack() {
  trackLists.forEach(el => {
    el.classList.remove('active_track');
    el.lastElementChild.classList.remove('pause');
  })
  trackLists[playNum].classList.add('active_track');
  if (audio.paused) {
    trackLists[playNum].lastElementChild.classList.add('pause');
  } else {
    trackLists[playNum].lastElementChild.classList.remove('pause');
  }
}

function playAudio() {
  activeCurTrack();
  togglePlay();
  toggleIcon();
}

function togglePlay() {
  let method = audio.paused ? "play" : "pause";
  audio[method]();
}
function toggleIcon() {
  if (audio.paused) {
    playBtn.classList.remove('pause');
  } else {
    playBtn.classList.add('pause');
  }
}

playBtn.addEventListener('click', playAudio);

//switch

function playNext() {
  playNum = playNum === 3 ? 0 : ++playNum;
  audio.src = `${playList[playNum].src}`;
  trackName.textContent = `${playList[playNum].title}`;
  audio.currentTime = 0;
  playAudio();
}
function playPrev() {
  playNum = playNum === 0 ? 3 : --playNum;
  audio.src = `${playList[playNum].src}`;
  trackName.textContent = `${playList[playNum].title}`;
  audio.currentTime = 0;
  playAudio();
}
prevBtn.addEventListener('click', playPrev);
nextBtn.addEventListener('click', playNext);

//volume 

function getVolume() {
  const value = progressVolume.value * 100;
  audio.volume = progressVolume.value;
  progressVolume.style.background = `linear-gradient(to right, #000000 0%, #000000 ${value}%, #fff ${value}%, #fff 100%)`;
  if (audio.volume === 0) {
    volumeIcon.classList.add('mute');
  } else {
    volumeIcon.classList.remove('mute');
  }
}
getVolume();
progressVolume.addEventListener('input', getVolume);

let curVolume;

function offVolume() {
  volumeIcon.classList.toggle('mute');
  if (+progressVolume.value > 0) {
    curVolume = progressVolume.value;
    progressVolume.value = 0;
  } else {
    progressVolume.value = curVolume;
  }
  getVolume();
}
volumeIcon.addEventListener('click', offVolume);

// progress bar

function handleProgress() {
  let percent = isNaN(audio.duration) ? 0 : audio.currentTime / audio.duration * 100;
  progressBar.value = isNaN(audio.duration) ? 0 :  audio.currentTime / audio.duration;
  progressBar.style.background = `linear-gradient(to right, #000000 0%, #000000 ${percent}%, #fff ${percent}%, #fff 100%)`;
  if (audio.currentTime === audio.duration) {
    playNext();
  }
  timeBar.textContent = `${formatTime(audio.currentTime)} / ${formatTime(audio.duration)}`;
}
function scrub(e) {
  let scrubTime = isNaN(audio.duration) ? 0 : (e.offsetX / progressBar.offsetWidth) * audio.duration;
  audio.currentTime = scrubTime;
  timeBar.textContent =  `${formatTime(audio.currentTime)} / ${formatTime(audio.duration)}`;
}
audio.addEventListener('timeupdate', handleProgress);
progressBar.addEventListener('click', scrub);

function formatTime(seconds) {
  if (!seconds) return `0:00`;
  let min = Math.floor((seconds / 60));
  let sec = Math.floor(seconds - (min * 60));
  if (sec < 10){ 
      sec  = `0${sec}`;
  };
  return `${min}:${sec}`;
};


function playTrack(e) {
  let curPlatNum = playNum;
  if (e.target.classList.contains('play-item_icon')) {
    if (e.target.classList.contains('pause')) {
      e.target.parentElement.classList.add('active_track');
      e.target.classList.remove('pause');

    } else {
      e.target.parentElement.classList.add('active_track');
      e.target.classList.add('pause');
      let track = e.target.parentElement.textContent;
      playNum = trackNumber[track];
      if (curPlatNum !== playNum) {
        audio.src = `${playList[playNum].src}`;
        trackName.textContent = `${playList[playNum].title}`;
      }
    }
    playAudio();
  }
}

trackList.addEventListener('click', playTrack);