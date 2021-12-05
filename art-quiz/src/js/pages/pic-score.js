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

  creatCard(index) {
    const curCardObj = JSON.parse(localStorage.getItem('answer'))[index];
    this.count = curCardObj.correct;

    const divCard = document.createElement('div');
    divCard.classList.add('category__card');
    divCard.id = index;
    divCard.innerHTML = `<div class="heading__card"><h4>${this.categories[index - 12]}</h4><div class="progress__card">${this.count}/10</div></div>`;
    if (this.count) {
      divCard.firstElementChild.classList.add('heading__card_active');
    }
    const cardDiv = document.createElement('div');
    cardDiv.classList.add('card__img');
    const img = document.createElement('img');
    img.src = `./assets/img/categories/${index}.jpg`;
    img.alt = `${index}`;
    if (!curCardObj.visit) {
      img.classList.add('card_inactive');
    }
    img.onload = () => {
      cardDiv.append(img);
      divCard.append(cardDiv);
    };
    divCard.addEventListener('click', (e) => {
      this.getImageOfCategory(e.currentTarget.id);
    });

    return divCard;
  }

  async showImages(category) {
    const data = await getData();
    const curCardObj = JSON.parse(localStorage.getItem('answer'))[category];

    const index = category > 0 ? category : '';
    const imgList = document.createElement('div');
    imgList.classList.add('categories__img__lists');

    for (let i = 0; i < 10; i += 1) {
      const digit = `${index}${i}`;
      const block = document.createElement('div');
      block.classList.add('container__img');
      const info = document.createElement('div');
      info.classList.add('img__info');
      info.innerHTML = `<h4>${data[digit].name}</h4><div>${data[digit].author}, ${data[digit].year}</div>`;
      const img = document.createElement('img');
      img.src = `./assets/img/all-img/${digit}.jpg`;
      img.alt = `${digit}`;
      if (!curCardObj.question[i].stats) {
        img.classList.add('card_inactive');
      }
      block.addEventListener('click', () => {
        if (!img.classList.contains('card_inactive')) {
          info.classList.toggle('img__info_active');
        }
      });
      img.onload = () => {
        block.append(img, info);
        imgList.append(block);
      };
    }
    this.main.append(imgList);
  }

  getImageOfCategory(category) {
    this.nameCategory = document.createElement('div');
    this.nameCategory.classList.add('score__container');
    this.nameCategory.innerHTML = '<span class="score_icon"></span>';
    const cur = document.createElement('span');
    cur.classList.add('score__category');
    cur.textContent = `${this.categories[category - 12]} category`;
    this.nameCategory.append(cur);
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