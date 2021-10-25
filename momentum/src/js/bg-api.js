// import {getTimeOfDay} from './clock';
import {curBg, tagsNameInput} from './settings';

let randomNum;

function getRandomNum() {
  return Math.ceil(Math.random() * 20)
}

function setBgSource(path, value) {
  switch (path) {
    case 'Github':
      setBg();
      break;
    case 'Unsplash API' :
      getLinkToImageUnsplash(value);
      break;
    case 'Flickr API':
      getLinkToImageFlickr(value);
      break;
  }
}
function getTimeOfDayBg(date) {
  const hours = date.getHours();
  // console.log(Math.floor(hours/6));
  let digitTime = Math.floor(hours/6);
  switch (digitTime) {
    case 0 : return "night";
    case 1 : return "morning";
    case 2 : return "afternoon";
    case 3 : return "evening";
  }
}
function setBg() {
  const date = new Date();
  let timeOfDay = getTimeOfDayBg(date);
  let bgNum;
  if (!randomNum) {
    bgNum = getRandomNum();
    randomNum = bgNum >= 10 ? bgNum : `0${bgNum}`;
  } else {
    randomNum = +randomNum;
    randomNum = randomNum >= 10 ? randomNum : `0${randomNum}`;
  }
  const img = new Image();

  img.src = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${timeOfDay}/${randomNum}.jpg`;
  img.onload = () => {      
    document.body.style.backgroundImage = `url('https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${timeOfDay}/${randomNum}.jpg')`;
  };
}
setBg();

const slidePrev = document.querySelector('.slide-prev');
const slideNext = document.querySelector('.slide-next');

function getSlideNext() {
  randomNum = randomNum === 20 ? 1 : ++randomNum;
  setBgSource(curBg);
}
function getSlidePrev() {
  randomNum = randomNum === '01' ? 20 : --randomNum;
  setBgSource(curBg);
}
slidePrev.addEventListener('click', getSlidePrev);
slideNext.addEventListener('click', getSlideNext);


async function getLinkToImageUnsplash(value) {
  let timeOfDay;
  if (!value) {
    const date = new Date();
    timeOfDay = getTimeOfDayBg(date);
  } else {
    timeOfDay = value;
  }
  console.log(timeOfDay);
  const url = `https://api.unsplash.com/photos/random?query=${timeOfDay}&client_id=24fQEfxLzr73V-8EQmY8VPLxSofe7nXj6eoxxNCwwLk`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    const img = new Image();
    img.src = `${data.urls.regular}`;
    img.onload = () => {      
      document.body.style.backgroundImage = `url(${data.urls.regular})`;
    };
  } 
  catch (err) {
    tagsNameInput.value = 'tag not exist';
  }
};

async function getLinkToImageFlickr(value) {
  let timeOfDay;
  if (!value) {
    const date = new Date();
    timeOfDay = getTimeOfDayBg(date);
  } else {
    timeOfDay = value;
  }
  const url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=1b0d579b298ef41061e8b07aff51a8e5&tags=${timeOfDay}&extras=url_l&format=json&nojsoncallback=1`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    let count = getRandomNum();
    const img = new Image();
    img.src = `${data.photos.photo[count].url_l}`;
    img.onload = () => {      
      document.body.style.backgroundImage = `url(${data.photos.photo[count].url_l})`;
    };
  }
  catch (err) {
    tagsNameInput.value = 'tag not exist';
  }
};

export {setBgSource};
