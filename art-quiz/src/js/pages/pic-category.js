import Category from './category';
import { CATEGORIES_IN_GAME } from '../components/constants'

class PicCategory extends Category {
  constructor() {
    super();
    this.nextPartCategories = CATEGORIES_IN_GAME / 2;
    this.header.innerHTML = `
        <div class="logo"><span class="logo_color"></span></div>
        <nav class="nav">
          <ul class="nav__list">
            <li class="nav__link"><a href="./#/">Home</a></li>
            <li class="nav__link active-link"><a href="./#/pic-category">Categories</a></li>
            <li class="nav__link"><a href="./#/pic-score">Score</a></li>
          </ul>
        </nav>
        <div class="setting_icon"><a href="./#/setting" class="set__btn"></a></div>`;
    this.navMenu.innerHTML = `
      <ul class="nav__bottom__list">
        <li class="bottom__link">
          <a href="./#/">
            <span class="nav_icon home"></span>
            <span class="nav_heading">Home</span>
          </a>
        </li>
        <li class="bottom__link active__bottom-link">
          <a href="./#/pic-category">
            <span class="nav_icon category"></span>
            <span class="nav_heading">Categories</span>
          </a>
        </li>
        <li class="bottom__link">
          <a href="./#/pic-score">
            <span class="nav_icon score"></span>
            <span class="nav_heading">Score</span>
          </a>
        </li>
      </ul>`;
  }

  createCard(index) {
    const curCardObj = JSON.parse(localStorage.getItem('answer'))[index];
    this.count = curCardObj.correct;

    const cardsContainer = document.createElement('a');
    cardsContainer.classList.add('category__card');
    cardsContainer.href = './#/pic-game';
    cardsContainer.innerHTML = `
    <div class="heading__card">
      <h4>${this.categories[index - this.nextPartCategories]}</h4>
      <div class="progress__card">${this.count}/10</div>
    </div>`;
    if (this.count) {
      cardsContainer.firstElementChild.classList.add('heading__card_active');
    }
    const imgWrapper = document.createElement('div');
    imgWrapper.classList.add('card__img');
    const img = document.createElement('img');
    img.src = `./assets/img/categories/${index}.jpg`;
    img.alt = `${index}`;
    if (!curCardObj.visit) {
      img.classList.add('card_inactive');
    }
    img.onload = () => {
      imgWrapper.append(img);
      cardsContainer.append(imgWrapper);
    };
    cardsContainer.addEventListener('click', () => {
      localStorage.setItem('curCategory', index);
    });
    return cardsContainer;
  }

  renderCard() {
    this.lists.innerHTML = '';
    this.categories.forEach((el, index) => {
      const i = this.nextPartCategories + index;
      const card = this.createCard(i);
      this.lists.append(card);
    });
  }
}

export default PicCategory;
