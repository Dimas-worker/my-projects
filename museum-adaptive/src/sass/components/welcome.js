import Swiper from 'swiper/bundle';

const swiper = new Swiper('.swiper', {

  // If we need pagination
  pagination: {
    el: '.panel__paginate',
    clickable: true,
    bulletClass: 'square',
    bulletActiveClass: 'square_active',
    // type: 'fraction',
  },

  // Navigation arrows
  navigation: {
    nextEl: '.arrow__right',
    prevEl: '.arrow__left',
  },
  grabCursor: true,
  loop: true,
});

const curSlide = document.querySelector('.cur_slide');
const totalSlide = document.querySelector('.total_slide');

totalSlide.textContent = `0${swiper.slides.length - 2}`;

swiper.on('slideChange', () => {
  let curr = ++ swiper.realIndex;
  curSlide.textContent = `0${curr}`;
})
