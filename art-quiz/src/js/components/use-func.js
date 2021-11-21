function randomImg() {
  return Math.floor(Math.random() * 240);
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function animationPage(el, cb) {
  el.classList.add('hidden__body');
  setTimeout(() => {
    cb();
  }, 1000)
  el.onanimationend = () => {
    el.classList.remove('hidden__body');
  }
}
function animationPopup(el) {
  el.classList.add('show__block');
  el.onanimationend = () => {
    el.classList.remove('show__block');
  }
}

function playSound(isTrue, isFinish = false) {
  // const isVolume = localStorage.getItem('timer') ? JSON.parse(localStorage.getItem('timer')) : true;
  const value = localStorage.getItem('volume') ? JSON.parse(localStorage.getItem('volume')) : 40;
  if (!value) return;
  const audio = new Audio();
  audio.volume = value / 100;
  if (!isFinish) {
    let track = isTrue ? 'yeap' : 'noep';
    audio.src = `./assets/sounds/${track}.mp3`;
  } else {
    audio.src = `./assets/sounds/end-round.mp3`;
  }
  
  audio.play();
}

async function getData() {
  const res = await fetch('./json/images.json');
  const data = await res.json();
  return data;
}
export { randomImg , shuffle , animationPage, playSound, animationPopup, getData };