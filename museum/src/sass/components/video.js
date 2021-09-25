// console.log('video.js');

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
  toggle.classList.toggle('pause__btn');
  toggleScreenIcon();
}

function toggleVideo() {
  video.src = `./assets/videos/video${index}.mp4`;
  video.poster = `./assets/videos/poster${index}.jpg`;
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
    toggleIcon()
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
const playerControls = document.querySelector('.player_controls');

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
const slider = document.querySelector('.video__slider');
const sliderItems = document.getElementById('video__container__slider');
const leftSwipe = document.querySelector('.swipe_left');
const rightSwipe = document.querySelector('.swipe_right');

const dots = document.querySelectorAll('.dot');
let index = 0;

function slide(items, leftSwipe, rightSwipe) {
  let posInitial,
  slides = items.getElementsByClassName('video__slide'),
  slidesLength = slides.length,
  slideSize = slides[0].offsetWidth + 42,
  firstSlide = slides[0],
  secondSlide = slides[1],
  thirdSlide = slides[2],
  lastSlide = slides[slidesLength - 1],
  cloneFirst = firstSlide.cloneNode(true),
  cloneSecond = secondSlide.cloneNode(true),
  cloneThird = thirdSlide.cloneNode(true),
  cloneLast = lastSlide.cloneNode(true);
  let allowShift = true;
  
  items.append(cloneFirst);
  items.append(cloneSecond);
  items.append(cloneThird);
  items.prepend(cloneLast);
  
  leftSwipe.addEventListener('click', () => {
    shiftSlide(-1);
  })
  rightSwipe.addEventListener('click', () => {
    shiftSlide(1);
  })

  dots.forEach(el => {
    el.addEventListener('click', switchDot)});
  function switchDot(event) {
    shiftSlide(event.target.id);
  }

  function shiftSlide(dir) {
    items.classList.add('shifting');
    // console.log('slideSize ' + slideSize);
    if (allowShift) {
      posInitial = items.offsetLeft;
      // console.log(dir);
      // console.log('posInitial ' + posInitial);
      if (dir === 1) {
        items.style.left = (posInitial - slideSize) + "px";
        index++;      
      } else if (dir === -1) {
        items.style.left = (posInitial + slideSize) + "px";
        index--;      
      } else {
        let x = +dir - index;
        // console.log('x: ' + x);
        items.style.left = (posInitial - slideSize * x) + "px";
        index = dir;
      }
      console.log('switch ' + video.paused);
      if (video.paused) {
        toggleScreenIcon();
      } else {
        toggleIcon();
      }
    };
    // console.log('index: ' + index);
    allowShift = false;
  }
  // Transition events
  items.addEventListener('transitionend', checkIndex);
  
  function checkIndex () {
    items.classList.remove('shifting');
    // console.log('slidesLength: ' + slidesLength);
    if (index === -1) {
      items.style.left = -((slidesLength) * slideSize) + "px";
      index = slidesLength - 1;
    }
    if (index === slidesLength) {
      items.style.left = -(1 * slideSize) + "px";
      index = 0;
    }
    dots.forEach(el => el.classList.remove('dot_active'));
    dots[index].classList.add('dot_active');
    // console.log('index: ' + index);
    toggleVideo();
    toggleScreenIcon();
    allowShift = true;
  }

  // Work with Keyboard
  // skip
  function skipPlus() {
    video.currentTime += 5;
  }
  function skipMinus() {
    video.currentTime -= 5;
  }
  // playbackRate
  function pLusPlaybackRate() {
    if (video.playbackRate >= 0.25 && video.playbackRate < 2) {
      video.playbackRate += 0.25;
    }
  }
  function minusPlaybackRate() {
    if (video.playbackRate > 0.25 && video.playbackRate <= 2) {
      video.playbackRate -= 0.25;
    }
  }
  window.addEventListener('keydown', (e) => {
    // console.log(e.code);
    // skip time
    if (e.code === 'ArrowRight') {
      skipPlus();
    } else if (e.code === 'ArrowLeft') {
      skipMinus();
    }
    // home or end
     else if (e.code === 'Home' || e.code === 'End') {
      console.log('down');
      e.preventDefault();
      if (e.code === 'Home') {
        video.currentTime = 0;
        handleProgress();
      } else {
        video.currentTime = video.duration;
        handleProgress();
      }
    }
    // space - pause
    else if (e.code === 'Space') {
      e.preventDefault();
      togglePlay();
      toggleIcon();
    }
    // volume - M
    else if (e.code === 'KeyM') {
      offVolume();
    }
    // fullscreen F
    else if (e.code === 'KeyF') {
      toggleFullScreen();
    }
    //playbackRate
    else if (e.code === 'Comma' && e.shiftKey) {
      minusPlaybackRate();
    } else if (e.code === 'Period' && e.shiftKey) {
      pLusPlaybackRate();
    }
    // change volume Up/down
    else if (e.code === 'ArrowUp') {
      e.preventDefault();
      if (+progressVolume.value < 1) {
        progressVolume.value = +progressVolume.value + 0.1;
      }
      progressVolume.value = progressVolume.value > 1 ? 1 : progressVolume.value;
      getVolume();
    }
    else if (e.code === 'ArrowDown') {
      e.preventDefault();
      if (progressVolume.value > 0) {
        progressVolume.value -= 0.1;
      }
      progressVolume.value = progressVolume.value < 0 ? 0 : progressVolume.value;
      getVolume();
    }
    // switch slide
    else if (e.code === 'KeyP' || (e.code === 'KeyP' && e.shiftKey)) {
      shiftSlide(-1);
    }
    else if (e.code === 'KeyN' || (e.code === 'KeyN' && e.shiftKey)) {
      shiftSlide(1);
    }
    // progressBar digit
    else if ((e.code).slice(0, 5) === 'Digit' && (e.code).slice(5) !== '0') {
      let per = `0.${(e.code).slice(5)}`;
      video.currentTime = video.duration * per;
      handleProgress();
    }
  });
}
slide(sliderItems, leftSwipe, rightSwipe);