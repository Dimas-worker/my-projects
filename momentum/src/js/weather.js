// console.log('welcome');
const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const weatherError = document.querySelector('.weather-error');
const city = document.querySelector('.city');
const wind = document.querySelector('.wind');
const humidity = document.querySelector('.humidity');

function getRound(value) {
  return Math.round(value);
}

async function getWeather(lang = "en") {  
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=${lang}&appid=9f3de14e252fbf325b5d4bcb3413e236&units=metric`;
  try {
    const res = await fetch(url);
    const data = await res.json();

    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    temperature.textContent = `${getRound(data.main.temp)}°C`;
    weatherDescription.textContent = data.weather[0].description;
    if (lang === 'ru') {
      wind.textContent = `Скорость ветра: ${getRound(data.wind.speed)} м/с`;
      humidity.textContent = `Влажность: ${getRound(data.main.humidity)} %`;
    } else {
      wind.textContent = `Wind speed: ${getRound(data.wind.speed)} m/s`;
      humidity.textContent = `Humidity: ${getRound(data.main.humidity)} %`;
    }
    weatherError.textContent = '';

  } 
  catch (err) {
    weatherIcon.className = 'weather-icon owf';
    temperature.textContent = '---- °C';
    weatherDescription.textContent = '';
    if (lang === 'ru') {
      weatherError.textContent = `Ошибка! Город ${city.value} не найден!`;
      wind.textContent = `Скорость ветра: ---- м/с`;
      humidity.textContent = `Влажность: ---- %`;
    } else {
      weatherError.textContent = `Error! city not found for ${city.value}!`;
      wind.textContent = `Wind speed: ---- m/s`;
      humidity.textContent = `Humidity: ---- %`;
    }
  }
}
getWeather()

function setCity(event) {
  if (event.code === 'Enter') {
    getWeather();
    city.blur();
  }
}

document.addEventListener('DOMContentLoaded', getWeather);
city.addEventListener('keypress', setCity);

//quote of the Day

const quote = document.querySelector('.quote');
const author = document.querySelector('.author');
const changeQuote = document.querySelector('.change-quote');

let randomQ = randomQuote();

async function getQuotes(lang = "en") {  
  const quotes = `./json/data-${lang}.json`;
  const res = await fetch(quotes);
  const data = await res.json();
  quote.textContent = data[randomQ]['text'];
  author.textContent = data[randomQ]['author'];
}
getQuotes();

function randomQuote() {
  return Math.floor(Math.random() * 10);
}
changeQuote.addEventListener('click', () => {
  let num = randomQ;
  randomQ = randomQuote();
  while (num === randomQ) {
    randomQ = randomQuote();
  }
  getQuotes()
})

//------------------------------localStorage---------------------


function setLocalStorageCity() {
  localStorage.setItem('city', city.value);
}
function getLocalStorageCity() {
  if(localStorage.getItem('city')) {
    city.value = localStorage.getItem('city');
  }
}
city.addEventListener('change', setLocalStorageCity);
window.addEventListener('DOMContentLoaded', getLocalStorageCity);
window.addEventListener('beforeunload', setLocalStorageCity);

export {getWeather, getQuotes, changeQuote}