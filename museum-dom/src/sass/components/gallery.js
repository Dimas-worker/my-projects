// console.log('gallery');

const galleryContainerInner = document.querySelector('.gallery__container_inner');

let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  let dif = Math.abs(array.indexOf(12) - array.indexOf(13));
  if (dif < 5) {
    shuffle(array);
  } else {
    return;
  }
}
shuffle(arr);

arr.forEach(el => {
  const img = document.createElement('img');
  img.classList.add('gallery__card');
  img.src = `assets/img/galery/galery${el}.jpg`;
  img.alt = `galery${el}`;
  galleryContainerInner.append(img);
  return img
})

function debounce(fun, wait = 10, immediate = true) {
  let timeout;
  return function() {
    let context = this,
    args = arguments;
    let later = function() {
      timeout = null;
      if (!immediate) fun.apply(context, args);
    };
    let callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) fun.apply(context, args);
  }
}
const imageAll = document.querySelectorAll('.gallery__card');
const imagesWrapper = document.querySelector('.gallery__container_inner');


function checkSlide() {
  let rec = imagesWrapper.getBoundingClientRect();
  imageAll.forEach(el => {
    const slideInAt = (window.scrollY + window.innerHeight);
    // console.log('slideInAt ' + slideInAt);
    // console.log(el.offsetTop);
    // console.log(window.scrollY + rec.top);
   
    const elBottom = window.scrollY + rec.top  + el.offsetTop;
    // console.log('elBottom ' + elBottom);
    // const isHalfShow = slideInAt > el.offsetTop;
    // const isNotScrolledPast = window.scrollY < elBottom;
    const isNotScrolledPast = slideInAt > elBottom;
    if (isNotScrolledPast) {
      el.classList.add('gallery__card_active');
    } else {
      el.classList.remove('gallery__card_active');
    }
  })
}
window.addEventListener('scroll', debounce(checkSlide));
debounce(checkSlide);
