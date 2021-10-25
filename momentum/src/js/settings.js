import {getWeather, getQuotes, changeQuote} from './weather';
import {showTime, timeId, nameUser, time, date} from './clock';
import {setBgSource} from './bg-api';

const langTip = document.querySelector('.language__icons');
const langListOptions = document.querySelectorAll('.language__icon');

let curLan = 'en';
let curBg = 'Github';

const settingLang = [
  {en: 'Setting', ru: 'Настройки'},
  {en: 'Language:', ru: 'Язык:'},
  {en: 'Source image:', ru: 'Источник изб:'},
  {en: 'tags:', ru: 'Тэги:'},
  {en: 'Display block:', ru: 'Показать/скрыть блоки:'},
  {en: 'Time', ru: 'Время'},
  {en: 'Date', ru: 'Дата'},
  {en: 'Greeting', ru: 'Приветствие'},
  {en: 'Quote', ru: 'Цитата'},
  {en: 'Weather', ru: 'Погода'},
  {en: 'Audio player', ru: 'Аудио плеер'},
  {en: 'ToDo', ru: 'Список задач'}
];

function translatePlaceHolder(lang = "en") {
  const inputTodo = document.querySelector('.input_task');
  if (lang === 'ru') {
    nameUser.placeholder = '[Введите имя]';
    inputTodo.placeholder = 'Задача...';
  } else {
    nameUser.placeholder = '[Enter name]';
    inputTodo.placeholder = 'Task...';
  }
};

function translateSetting(lang) {
  const set = document.querySelectorAll('.lan__display');
  set.forEach((el, index) => {
    el.textContent = settingLang[index][lang];
  })
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
  translateSetting(curLan);
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
const todoContainer = document.querySelector('.todo');

const arr = [time, date, greetingContainer, [quotesContainer, changeQuote], weatherContainer, playerContainer, todoContainer];
// const arrBlocks = [time, date, greetingContainer, quotesContainer, weatherContainer, playerContainer, todoContainer];

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

function checksBlocks(arr) {
  arr.forEach(el => {
    if (el.checked) {
      localStorage.setItem(el.id, 'checked');
    } else {
      localStorage.setItem(el.id, 'no-checked');
    }
  })
}

function setChecksBocks(arrCheck, arr) {
  arrCheck.forEach(el => {
    if (localStorage.getItem(el.id) === 'no-checked') {
      el.checked = false;
      if (Array.isArray(arr[el.name])) {
        arr[el.name].forEach(el => {
          el.classList.add('hidden_block');
        });
      } else {
        arr[el.name].classList.add('hidden_block');
      }
    } else {
      el.checked = true;
      if (Array.isArray(arr[el.name])) {
        arr[el.name].forEach(el => {
          el.classList.remove('hidden_block');
        });
      } else {
        arr[el.name].classList.remove('hidden_block');
      }
    }
  })
};

function setMenuSetting(lan, bg) {
  bgListOptions.forEach(el => {
    if (el.textContent === bg) {
      el.classList.add('bg__icon_active');
    } else {
      el.classList.remove('bg__icon_active');
    }
  });
  if (bg !== 'Github') {
    tagsName.classList.add('tags__name_active');
  } else {
    tagsName.classList.remove('tags__name_active');
  }
  setBgSource(bg);

  langListOptions.forEach(el => {
    if (el.textContent === lan) {
      el.classList.add('language__icon_active');
    } else {
      el.classList.remove('language__icon_active');
    }
  });
  getQuotes(lan);
  getWeather(lan);
  clearTimeout(timeId);
  showTime(lan);
  translatePlaceHolder(lan);
  translateSetting(lan);
};

// -----------------------localStorage---------------------------

function setLocalStorageBg() {
  localStorage.setItem('curBg', curBg);
  localStorage.setItem('curLan', curLan);
  checksBlocks(checks);
}
function getLocalStorageBg() {
  if(localStorage.getItem('curBg')) {
    curBg = localStorage.getItem('curBg');
  }
  if(localStorage.getItem('curLan')) {
    curLan = localStorage.getItem('curLan');
  }
  setChecksBocks(checks, arr);
  setMenuSetting(curLan, curBg);
}
nameUser.addEventListener('change', setLocalStorageBg);
window.addEventListener('DOMContentLoaded', getLocalStorageBg);
window.addEventListener('beforeunload', setLocalStorageBg);
export {curBg, tagsNameInput};
