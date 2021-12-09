import { ALL_IMAGES, DEFAULT_VOLUME, MAX_VOLUME, QUESTION_IN_ROUND , ART_CATEGORIES } from './constants';

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
  let track = ''
  const value = localStorage.getItem('volume') ? JSON.parse(localStorage.getItem('volume')) : DEFAULT_VOLUME;
  if (!value) return;
  const audio = new Audio();
  audio.volume = value / MAX_VOLUME;
  if (isFinish) {
    track = 'end-round';
  } else if (isTrue) {
    track = 'yeap';
  } else {
    track = 'noep';
  }

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

function createHeader(page, isPicturesGame = false) {
  const activeLink = {
    Home: '',
    Categories: '',
    Score: ''
  }
  activeLink[page] = 'active-link';
  const preLink = isPicturesGame ? 'pic-' : '';
  const header = document.createElement('div');
  header.classList.add('categories__header');
  header.innerHTML = `
    <div class="logo">
    <span class="logo_color"></span>
    </div>
    <nav class="nav">
    <ul class="nav__list">
    <li class="nav__link ${activeLink.Home}">
    <a href="./#/">Home</a>
    </li>
    <li class="nav__link ${activeLink.Categories}">
    <a href="./#/${preLink}category">Categories</a>
    </li>
    <li class="nav__link ${activeLink.Score}">
    <a href="./#/${preLink}score">Score</a>
    </li>
    </ul>
    </nav>
    <div class="setting_icon">
    <a href="./#/setting" class="set__btn"></a>
    </div>`;
  return header;
}

function createNavMenu(page, isPicturesGame = false) {
  const activeLink = {
    Home: '',
    Categories: '',
    Score: ''
  }
  activeLink[page] = 'active__bottom-link';
  const preLink = isPicturesGame ? 'pic-' : '';
  const navMenu = document.createElement('div');
  navMenu.classList.add('nav__bottom');
  navMenu.innerHTML = `
    <ul class="nav__bottom__list">
    <li class="bottom__link ${activeLink.Home}">
    <a href="./#/">
    <span class="nav_icon home"></span>
    <span class="nav_heading">Home</span>
    </a>
    </li>
    <li class="bottom__link ${activeLink.Categories}">
    <a href="./#/${preLink}category">
    <span class="nav_icon category"></span>
    <span class="nav_heading">Categories</span>
    </a>
    </li>
    <li class="bottom__link ${activeLink.Score}">
    <a href="./#/${preLink}score">
    <span class="nav_icon score"></span>
    <span class="nav_heading">Score</span>
    </a>
    </li>
    </ul>`;
  return navMenu;
}

function createFooter() {
  const footer = document.createElement('div');
  footer.classList.add('footer');
  footer.innerHTML = `
  <div class="school__logo"><a href="https://rs.school/js/" target="_blank" class="rss"></a></div>
  <div class="developer"><a href="https://github.com/Dimas-worker" target="_blank">dimas-worker</a></div>
  <div class="create__year">2021</div>`;
  return footer;
}

export { getRandomImgNumber, mixValue, animatePage, playSound, animatePopup, getData, createImgList, createImgOfCategory, createFooter, createHeader, createNavMenu };
