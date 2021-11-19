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
  let isVolume = localStorage.getItem('timer') ? JSON.parse(localStorage.getItem('timer')) : true;
  if (!isVolume) return;
  const audio = new Audio();
  if (!isFinish) {
    let track = isTrue ? 'yeap' : 'noep';
    audio.src = `assets/sounds/${track}.mp3`;
  } else {
    audio.src = `assets/sounds/end-round.mp3`;
  }
  
  audio.play();
}
export { randomImg , shuffle , animationPage, playSound, animationPopup };