import { ALL_IMAGES, DEFAULT_VOLUME, MAX_VOLUME, QUESTION_IN_ROUND } from './constants';
import { ART_CATEGORIES } from './constants';

function getRandomImgNumber() {
  return Math.floor(Math.random() * ALL_IMAGES);
}

function mixValue(array) {
  const curArray = [...array];
  for (let i = curArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [curArray[i], curArray[j]] = [curArray[j], curArray[i]];
  }
  return curArray;
}

function animatePage(tag, renderPage) {
  const curTag = tag;
  curTag.classList.add('hidden__body');
  setTimeout(() => {
    renderPage();
  }, 1000);
  curTag.onanimationend = () => {
    curTag.classList.remove('hidden__body');
  };
}

function animatePopup(tag) {
  const curTag = tag;
  curTag.classList.add('show__block');
  curTag.onanimationend = () => {
    curTag.classList.remove('show__block');
  };
}

function playSound(isTrue, isFinish = false) {
  const value = localStorage.getItem('volume') ? JSON.parse(localStorage.getItem('volume')) : DEFAULT_VOLUME;
  if (!value) return;
  const audio = new Audio();
  audio.volume = value / MAX_VOLUME;
  const track = isFinish ? 'end-round' : isTrue ? 'yeap' : 'noep';
  audio.src = `./assets/sounds/${track}.mp3`;
  audio.play();
}

async function getData() {
  const res = await fetch('./json/images.json');
  const data = await res.json();
  return data;
}

async function createImgList(category) {
  const allPictures = await getData();
  const curCardObj = JSON.parse(localStorage.getItem('answer'))[category];

  const index = category > 0 ? category : '';
  const imgList = document.createElement('div');
  imgList.classList.add('categories__img__lists');

  for (let i = 0; i < QUESTION_IN_ROUND; i++) {
    const uniqueNumberOfPicture = `${index}${i}`;
    const imgDiv = document.createElement('div');
    imgDiv.classList.add('container__img');
    const tittleOfPicture = document.createElement('div');
    tittleOfPicture.classList.add('img__info');
    tittleOfPicture.innerHTML = `
      <h4>${allPictures[uniqueNumberOfPicture].name}</h4><div>${allPictures[uniqueNumberOfPicture].author}, ${allPictures[uniqueNumberOfPicture].year}</div>`;
    const img = document.createElement('img');
    img.src = `./assets/img/all-img/${uniqueNumberOfPicture}.jpg`;
    img.alt = `${uniqueNumberOfPicture}`;
    if (!curCardObj.question[i].stats) {
      img.classList.add('card_inactive');
    }
    imgDiv.addEventListener('click', () => {
      if (!img.classList.contains('card_inactive')) {
        tittleOfPicture.classList.toggle('img__info_active');
      }
    });
    img.onload = () => {
      imgDiv.append(img, tittleOfPicture);
      imgList.append(imgDiv);
    };
  }
  return imgList;
}

function createImgOfCategory(category) {
  const nameCategory = document.createElement('div');
    nameCategory.classList.add('score__container');
    nameCategory.innerHTML = '<span class="score_icon"></span>';
    const numberOfCategory = document.createElement('span');
    numberOfCategory.classList.add('score__category');
    numberOfCategory.textContent = `${ART_CATEGORIES[category % ART_CATEGORIES.length]} category`;
    nameCategory.append(numberOfCategory);
    return nameCategory;
}

export {
  getRandomImgNumber, mixValue, animatePage, playSound, animatePopup, getData, createImgList, createImgOfCategory
};
