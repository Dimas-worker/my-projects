import PicCategory from './pic-category';
import { getData } from '../components/use-func';

class PicScore extends PicCategory {
  constructor() {
    super();
    this.header = document.createElement('div');
    this.header.classList.add('categories__header');
    this.header.innerHTML = `
    <div class="logo"><span class="logo_color"></span></div>
    <nav class="nav">
      <ul class="nav__list">
        <li class="nav__link"><a href="./#/">Home</a></li>
        <li class="nav__link"><a href="./#/pic-category">Categories</a></li>
        <li class="nav__link active-link"><a href="./#/pic-score">Score</a></li>
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
      <li class="bottom__link">
        <a href="./#/pic-category">
          <span class="nav_icon category"></span>
          <span class="nav_heading">Categories</span>
        </a>
      </li>
      <li class="bottom__link active__bottom-link">
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

    const cardsContainer = document.createElement('div');
    cardsContainer.classList.add('category__card');
    cardsContainer.id = index;
    cardsContainer.innerHTML = `<div class="heading__card"><h4>${this.categories[index - 12]}</h4><div class="progress__card">${this.count}/10</div></div>`;
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
    cardsContainer.addEventListener('click', (e) => {
      this.getImageOfCategory(e.currentTarget.id);
    });

    return cardsContainer;
  }

  async showImages(category) {
    const allPictures = await getData();
    const curCardObj = JSON.parse(localStorage.getItem('answer'))[category];

    const index = category > 0 ? category : '';
    const imgList = document.createElement('div');
    imgList.classList.add('categories__img__lists');

    for (let i = 0; i < 10; i += 1) {
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
    this.main.append(imgList);
  }

  getImageOfCategory(category) {
    this.nameCategory = document.createElement('div');
    this.nameCategory.classList.add('score__container');
    this.nameCategory.innerHTML = '<span class="score_icon"></span>';
    const numberOfCategory = document.createElement('span');
    numberOfCategory.classList.add('score__category');
    numberOfCategory.textContent = `${this.categories[category - 12]} category`;
    this.nameCategory.append(numberOfCategory);
    this.main.innerHTML = '';
    this.main.append(this.nameCategory);
    this.showImages(category);

    this.nameCategory.addEventListener('click', () => {
      this.nameCategory.remove();
      this.main.innerHTML = '<h3>Categories</h3><div class="categories__list"></div>';
      this.main.lastElementChild.append(this.lists);
      this.renderCard();
      this.main.classList.add('show__block');
      this.main.addEventListener('animationend', () => {
        this.main.classList.remove('show__block');
      });
    });
  }
}

export default PicScore;
