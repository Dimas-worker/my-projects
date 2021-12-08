function getRandomImgNumber() {
  return Math.floor(Math.random() * 240);
}

function mixedValue(array) {
  const curArray = [].concat(array);
  for (let i = curArray.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [curArray[i], curArray[j]] = [curArray[j], curArray[i]];
  }
  return curArray;
}

function animationPage(tag, renderPage) {
  const curTag = tag;
  curTag.classList.add('hidden__body');
  setTimeout(() => {
    renderPage();
  }, 1000);
  curTag.onanimationend = () => {
    curTag.classList.remove('hidden__body');
  };
}

function animatedPopup(tag) {
  const curTag = tag;
  curTag.classList.add('show__block');
  curTag.onanimationend = () => {
    curTag.classList.remove('show__block');
  };
}

function playSound(isTrue, isFinish = false) {
  const value = localStorage.getItem('volume') ? JSON.parse(localStorage.getItem('volume')) : 40;
  if (!value) return;
  const audio = new Audio();
  audio.volume = value / 100;
  if (!isFinish) {
    const track = isTrue ? 'yeap' : 'noep';
    audio.src = `./assets/sounds/${track}.mp3`;
  } else {
    audio.src = './assets/sounds/end-round.mp3';
  }
  audio.play();
}

async function getData() {
  const res = await fetch('./json/images.json');
  const data = await res.json();
  return data;
}

export {
  getRandomImgNumber, mixedValue, animationPage, playSound, animatedPopup, getData,
};
