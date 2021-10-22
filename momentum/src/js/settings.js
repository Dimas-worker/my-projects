import {getWeather, getQuotes, changeQuote} from './weather';
import {showTime, timeId, nameUser, time, date} from './clock';
import {setBgSource} from './bg-api';

const langTip = document.querySelector('.language__icons');
const langListOptions = document.querySelectorAll('.language__icon');

let curLan = 'en';
let curBg = 'Github';

function translatePlaceHolder(lang = "en") {
  if (lang === 'ru') {
    nameUser.placeholder = '[Введите имя]';
  } else {
    nameUser.placeholder = '[Enter name]';
  }
};

langTip.addEventListener('click', (event) => {
  langListOptions.forEach(el => {
    el.classList.remove('language__icon_active');
  });
  if (event.target.classList.contains('language__icon')) {
    event.target.classList.add('language__icon_active');
    curLan = event.target.textContent;
  }
  getQuotes(curLan);
  getWeather(curLan);
  clearTimeout(timeId);
  showTime(curLan);
  translatePlaceHolder(curLan);
});

const bgTip = document.querySelector('.background__icons');
const bgListOptions = document.querySelectorAll('.bg__icon');
const tagsName = document.querySelector('.tags__name');


bgTip.addEventListener('click', (event) => {
  bgListOptions.forEach(el => {
    el.classList.remove('bg__icon_active');
  });
  if (event.target.classList.contains('bg__icon')) {
    event.target.classList.add('bg__icon_active');
    curBg = event.target.textContent;
  }
  if (curBg !== 'Github') {
    tagsName.classList.add('tags__name_active');
  } else {
    tagsName.classList.remove('tags__name_active');
  }
  setBgSource(curBg);
});

// open setting--------------------------------------------

const settingIcon = document.querySelector('.setting-icon');
const settingList = document.querySelector('.setting__lists');

settingIcon.addEventListener('click', () => {
  settingIcon.classList.toggle('setting-icon_active');

  if (settingIcon.classList.contains('setting-icon_active')) {
    settingList.classList.add('setting__lists_active');
  } else {
    settingList.classList.remove('setting__lists_active');
  }
});

// -----------------------localStorage---------------------------

function setLocalStorageBg() {
  localStorage.setItem('curBg', curBg);
  localStorage.setItem('curLan', curLan);
}
function getLocalStorageBg() {
  if(localStorage.getItem('curBg')) {
    curBg = localStorage.getItem('curBg');
  }
  if(localStorage.getItem('curLan')) {
    curLan = localStorage.getItem('curLan');
  }
}
nameUser.addEventListener('change', setLocalStorageBg);
window.addEventListener('DOMContentLoaded', getLocalStorageBg);
window.addEventListener('beforeunload', setLocalStorageBg);

//-----------------------------tags name --------------------------

const tagsNameInput = document.querySelector('.tags__name_input');

tagsNameInput.addEventListener('change', () => {
  console.log(tagsNameInput.value);
  setBgSource(curBg, tagsNameInput.value);
})

//---------hidden block--------------------------------------------

const greetingContainer = document.querySelector('.greeting-container');
const quotesContainer = document.querySelector('.quotes__container');
const weatherContainer = document.querySelector('.weather');
const playerContainer = document.querySelector('.player');
const checks = document.querySelectorAll('.checkbox_vis');

const arr = [time, date, greetingContainer, [quotesContainer, changeQuote], weatherContainer, playerContainer]

checks.forEach(el => {
  el.addEventListener('change', () => {
    if (el.checked) {
      if (Array.isArray(arr[el.name])) {
        arr[el.name].forEach(el => {
          el.classList.remove('hidden_block');
        });
      } else {
        arr[el.name].classList.remove('hidden_block');
      }
    } else {
      if (Array.isArray(arr[el.name])) {
        arr[el.name].forEach(el => {
          el.classList.add('hidden_block');
        });
      } else {
        arr[el.name].classList.add('hidden_block');
      }
    }
  })
})
export {curBg, tagsNameInput};
