// console.log('clock');
const time = document.querySelector('.time');
const date = document.querySelector('.date');
const greeting = document.querySelector('.greeting');
const nameUser = document.querySelector('.name');

const language = {
  en: 'en-US',
  ru: 'ru-RU',
}
let timeId;

function showTime(l = "en") {
  let lang = l;
  const data = new Date();
  const options = {hour12: false, hour: 'numeric', minute: 'numeric', second: 'numeric'};
  const currentTime = data.toLocaleTimeString('en-US', options);
  time.textContent = currentTime;

  showDate(data, lang);
  const timeOfDay = getTimeOfDay(data,  lang);
  if (lang === 'ru') {
    if (timeOfDay === 'день' || timeOfDay === 'вечер') {
      greeting.textContent = `Добрый ${timeOfDay},`;
    } else if (timeOfDay === 'утро') {
      greeting.textContent = `Доброе ${timeOfDay},`;
    } else {
      greeting.textContent = `Доброй ${timeOfDay},`;
    }
  } else {
    greeting.textContent = `Good ${timeOfDay[0].toUpperCase() + timeOfDay.slice(1)},`;
  }
  timeId = setTimeout(() => {
    showTime(lang);
  }, 1000);
}
showTime();

function showDate(data, lang = "en") {
  const options = {weekday:'long', month: 'long', day: 'numeric'};
  const currentDate = data.toLocaleDateString(`${language[lang]}`, options);
  date.textContent = currentDate;
}

//welcome

function getTimeOfDay(date, lang = "en") {
  const hours = date.getHours();
  // console.log(Math.floor(hours/6));
  let digitTime = Math.floor(hours/6);
  if (lang == 'ru') {
    switch (digitTime) {
      case 0 : return "ночи";
      case 1 : return "утро";
      case 2 : return "день";
      case 3 : return "вечер";
    }
  } else {
    switch (digitTime) {
      case 0 : return "night";
      case 1 : return "morning";
      case 2 : return "afternoon";
      case 3 : return "evening";
    }
  }
}

// -----------------------localStorage---------------------------

function setLocalStorageName() {
  localStorage.setItem('name', nameUser.value);
}
function getLocalStorageName() {
  if(localStorage.getItem('name')) {
    nameUser.value = localStorage.getItem('name');
  }
}
nameUser.addEventListener('change', setLocalStorageName);
window.addEventListener('DOMContentLoaded', getLocalStorageName);
window.addEventListener('beforeunload', setLocalStorageName);


export {showTime, timeId, nameUser , getTimeOfDay, time, date}