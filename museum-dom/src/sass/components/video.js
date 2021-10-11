import {popup} from './tickets';

const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const toggle = player.querySelector('.toggle');
const screenBtn = player.querySelector('.screen_button');

//play or pause
function togglePlay() {
  let method = video.paused ? 'play' : 'pause';
  video[method]();
}
function toggleScreenIcon() {
  if(video.paused) {
    screenBtn.style.display = 'inline-block';
  } else {
    screenBtn.style.display = 'none';
  }
}
function toggleIcon() {
  if (video.paused) {
    toggle.classList.remove('pause__btn');
  } else {
    toggle.classList.add('pause__btn');
  }
  toggleScreenIcon();
}

document.addEventListener('click', (e) => {
  if (e.target.name === 'screen-btn' || e.target.name === 'toggle' || e.target.className === 'player__video viewer') {
    togglePlay();
    toggleIcon();
  }
});


//volume
const progressVolume = document.querySelector('.player__volume');
const btnVolume = document.querySelector('.volume__btn');

function getVolume() {
  const value = progressVolume.value * 100;
  video.volume = progressVolume.value;
  progressVolume.style.background = `linear-gradient(to right, #710707 0%, #710707 ${value}%, #c4c4c4 ${value}%, white 100%)`;
  if (video.volume === 0) {
    btnVolume.classList.add('volume__btn_mute');
  } else {
    btnVolume.classList.remove('volume__btn_mute');
  }
}
getVolume();
progressVolume.addEventListener('input', getVolume);

let curVolume;
function offVolume() {
  btnVolume.classList.toggle('volume__btn_mute');
  if (+progressVolume.value > 0) {
    curVolume = progressVolume.value;
    progressVolume.value = 0;
  } else {
    progressVolume.value = curVolume;
  }
  getVolume();
}
btnVolume.addEventListener('click', offVolume);

//progressBar
const progressBar = document.querySelector('.progress__bar');

function handleProgress() {
  let percent = isNaN(video.duration) ? 0 : video.currentTime / video.duration * 100;
  progressBar.value = isNaN(video.duration) ? 0 : video.currentTime / video.duration;
  progressBar.style.background = `linear-gradient(to right, #710707 0%, #710707 ${percent}%, #c4c4c4 ${percent}%, white 100%)`;
  
  if (video.currentTime === video.duration) {
    toggleIcon();
  }
}
function scrub(e) {
  let scrubTime = isNaN(video.duration) ? 0 : (e.offsetX / progressBar.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
  
}

video.addEventListener('timeupdate', handleProgress);
let mousedown = false;

progressBar.addEventListener('click', scrub);
progressBar.addEventListener('mousemove', (e) => mousedown && scrub(e));
progressBar.addEventListener('mousedown', () => mousedown = true);
progressBar.addEventListener('mouseup', () => mousedown = false);



//fullscreen
const fullscreenBtn = document.querySelector('.fullscreen__btn');
// const playerControls = document.querySelector('.player_controls');

function toggleFullScreen() {
  // playerControls.classList.toggle('player_controls_full');
  if (!document.fullscreenElement) {
    player.requestFullscreen();
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }
}
fullscreenBtn.addEventListener('click', toggleFullScreen);
document.addEventListener('fullscreenchange', () => {
  fullscreenBtn.classList.toggle('fullscreen__btn_exit');
});

//hidden controls

// let timerId = setTimeout(hiddenPanel, 8000);

// function hiddenPanel() {
//   console.log('hidden');
//   playerControls.classList.add('player_controls_hidden');
// }
// function showPanel() {
//   clearTimeout(timerId);
//   playerControls.classList.remove('player_controls_hidden');
//   timerId = setTimeout(hiddenPanel, 8000);
// }
// window.addEventListener('mousemove', showPanel);

// playerControls.addEventListener('mouseenter', () => {
//   setTimeout(() => {
//     clearTimeout(timerId);
//     playerControls.classList.remove('player_controls_hidden');
//   }, 1000)
// });
// playerControls.addEventListener('mouseleave', showPanel);


//sliders

import Swiper from 'swiper/bundle';
const videoSwiper = new Swiper('.video__slider', {
  
  pagination: {
    el: '.dots__swipes',
    clickable: true,
    bulletClass: 'dot',
    bulletActiveClass: 'dot_active',
  },
  
  navigation: {
    nextEl: '.swipe_right',
    prevEl: '.swipe_left',
  },
  slidesPerView: 3,
  spaceBetween: 42,
  
  loop: true,
  
  breakpoints: {
    
    1018: {
      slidesPerView: 3,
      spaceBetween: 42,
    },
    320: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
  }
});

videoSwiper.on('slideChange', () => {
  let index = ++ videoSwiper.realIndex;
  --index;
  if (!video.paused) {
    toggleIcon();
  }
  video.src = `./assets/videos/video${index}.mp4`;
  video.poster = `./assets/videos/poster${index}.jpg`;
  toggleScreenIcon();
})
// const swipeVideo = document.querySelectorAll('.dots');
const videoSlide = document.querySelectorAll('.video__slide');

function stopIframe() {
  const iframeSlides = document.getElementsByClassName('slider__iframe');
  let arrIframe = Array.from(iframeSlides);
  console.log(arrIframe);
  arrIframe.forEach(el => {
    console.log(el);
    el.contentWindow.postMessage('{"event":"command","func":"stopVideo","args":""}', '*')
    el.addEventListener('command', () => {
      console.log('event');
    })
  })
}


// console.log(swipeVideo);
// swipeVideo.forEach(el => {
//   el.addEventListener('click', stopIframe)
// })
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('dot') || e.target.classList.contains('swipe')) {
    stopIframe();
  }
})

videoSlide.forEach(el => {
  el.addEventListener('click', stopIframe)
})



// Work with Keyboard
// skip

function skipPlus() {
  if (video.currentTime === video.duration) return;
  video.currentTime += 5;
}
function skipMinus() {
  if (video.currentTime === 0) return;
  video.currentTime -= 5;
}
// playbackRate
const creatEl = (speed) => {
  let speedInfo = document.createElement('div');
    speedInfo.classList.add('video__speed_info');
    speedInfo.textContent = `${video.playbackRate + speed}x`;
    player.appendChild(speedInfo);
    setTimeout(() => speedInfo.remove(), 300);
}
function pLusPlaybackRate() {
  if (video.playbackRate >= 0.25 && video.playbackRate < 2) {
    creatEl(0.25);
    video.playbackRate += 0.25;
  }
}
function minusPlaybackRate() {
  if (video.playbackRate > 0.25 && video.playbackRate <= 2) {
    creatEl(-0.25);
    video.playbackRate -= 0.25;
  }
}
let onView = false;
 
window.addEventListener('keydown', (e) => {
  onView = popup.classList.contains('popup_active');
  if (onView) return;
  if (e.repeat) return;
  console.log(e.code);
  // skip time
  switch (e.code) {
    case 'ArrowRight': skipPlus();
      break;
    case 'ArrowLeft': skipMinus();
      break;
    case 'Home': 
      e.preventDefault();
      video.currentTime = 0;
      handleProgress();
      break;
    case 'End': 
      e.preventDefault();
      video.currentTime = video.duration;
      handleProgress();
      break;
    case 'Space': 
      e.preventDefault();
      togglePlay();
      toggleIcon();
      break;
    case 'KeyM': offVolume();
      break;  
    case 'KeyF': toggleFullScreen();
      break;
    case 'ArrowUp': 
      e.preventDefault();
      if (+progressVolume.value < 1) progressVolume.value = +progressVolume.value + 0.1;
      progressVolume.value = progressVolume.value > 1 ? 1 : progressVolume.value;
      getVolume();
      break;
    case 'ArrowDown': 
      e.preventDefault();
      if (progressVolume.value > 0) progressVolume.value -= 0.1;
      progressVolume.value = progressVolume.value < 0 ? 0 : progressVolume.value;
      getVolume();
      break;
  }
    //playbackRate
    if (e.code === 'Comma' && e.shiftKey) {
      minusPlaybackRate();
    } else if (e.code === 'Period' && e.shiftKey) {
      pLusPlaybackRate();
    }
    // progressBar digit
    else if ((e.code).slice(0, 5) === 'Digit' && (e.code).slice(5) !== '0') {
      let per = `0.${(e.code).slice(5)}`;
      video.currentTime = video.duration * per;
      handleProgress();
    }
});

// --------------------iframe------------------------------------------- 

function findVideos() {
  let videos = document.querySelectorAll('.video__slide');
  for (let i = 0; i < videos.length; i++) {
    setupVideo(videos[i]);
  }
}

function setupVideo(video) {
    let link = video.querySelector('.video__slide_link');
    let media = video.querySelector('.video__slide_img');
    let button = video.querySelector('.video__slide_btn');
    let icon = video.querySelector('.video__slide_logo');
    let text = video.querySelector('.video__slide_title');
    let id = parseMediaURL(media);
    video.addEventListener('click', () => {
      let iframe = createIframe(id);
      link.remove();
      button.remove();
      icon.remove();
      text.remove();
      video.appendChild(iframe);
    });
    link.removeAttribute('href');
}

function parseMediaURL(media) {
    let match;
    let regexp = /https:\/\/i\.ytimg\.com\/vi\/([a-zA-Z0-9_-]+)\/maxresdefault\.jpg/i;
    let regexp_hq = /https:\/\/i\.ytimg\.com\/vi\/([a-zA-Z0-9_-]+)\/mqdefault\.jpg/i;
    let url = media.src;
    if (/mqdefault/.test(url)) {
      match = url.match(regexp_hq);
    } else {
      match = url.match(regexp);
    }
    return match[1];
}

function createIframe(id) {
    let iframe = document.createElement('iframe');
    iframe.setAttribute('allowfullscreen', "");
    iframe.setAttribute('allow', 'autoplay');
    iframe.setAttribute('src', generateURL(id));
    iframe.classList.add('slider__iframe');
    return iframe;
}

function generateURL(id) {
    let query = '?rel=0&showinfo=0&autoplay=1&enablejsapi=1';
    return 'https://www.youtube.com/embed/' + id + query;
}
findVideos();