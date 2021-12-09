import { ART_CATEGORIES } from '../components/constants';

class Category {
  constructor() {
    this.categories = ART_CATEGORIES;
    this.container = document.body;
    this.section = document.createElement('div');
    this.section.classList.add('wrapper', 'categories__wrapper');
    this.header = document.createElement('div');
    this.header.classList.add('categories__header');
    this.header.innerHTML = `
        <div class="logo"><span class="logo_color"></span></div>
        <nav class="nav">
          <ul class="nav__list">
            <li class="nav__link"><a href="./#/">Home</a></li>
            <li class="nav__link active-link"><a href="./#/category">Categories</a></li>
            <li class="nav__link"><a href="./#/score">Score</a></li>
          </ul>
        </nav>
        <div class="setting_icon"><a href="./#/setting" class="set__btn"></a></div>`;
    this.main = document.createElement('div');
    this.main.classList.add('categories__main');
    this.main.innerHTML = '<h3>Categories</h3><div class="categories__list"></div>';
    this.lists = document.createElement('div');
    this.lists.classList.add('categories__list_inner');
    this.main.lastElementChild.append(this.lists);
    this.navMenu = document.createElement('div');
    this.navMenu.classList.add('nav__bottom');
    this.navMenu.innerHTML = `
      <ul class="nav__bottom__list">
        <li class="bottom__link">
          <a href="./#/">
            <span class="nav_icon home"></span>
            <span class="nav_heading">Home</span>
          </a>
        </li>
        <li class="bottom__link active__bottom-link">
          <a href="./#/category">
            <span class="nav_icon category"></span>
            <span class="nav_heading">Categories</span>
          </a>
        </li>
        <li class="bottom__link">
          <a href="./#/score">
            <span class="nav_icon score"></span>
            <span class="nav_heading">Score</span>
          </a>
        </li>
      </ul>`;
    this.footer = document.createElement('div');
    this.footer.classList.add('footer');
    this.footer.innerHTML = `
        <div class="school__logo"><a href="https://rs.school/js/" target="_blank" class="rss"></a></div>
        <div class="developer"><a href="https://github.com/Dimas-worker" target="_blank">dimas-worker</a></div>
        <div class="create__year">2021</div>`;
  }

  renderHTML() {
    this.container.innerHTML = '';
    this.section.append(this.header);
    this.section.append(this.main);
    this.section.append(this.footer);
    this.section.append(this.navMenu);
    this.container.append(this.section);
    return this.container;
  }

  createCard(index) {
    const curCardObj = JSON.parse(localStorage.getItem('answer'))[index];
    const count = curCardObj.correct;

    const cardsContainer = document.createElement('a');
    cardsContainer.classList.add('category__card');
    cardsContainer.href = './#/art-game';
    cardsContainer.innerHTML = `
      <div class="heading__card">
        <h4>${this.categories[index]}</h4>
        <div class="progress__card">${count}/10</div>
      </div>`;
    if (count) {
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
      const card = this.createCard(index);
      this.lists.append(card);
    });
  }

  render() {
    this.renderHTML();
    this.renderCard();
  }
}

export default Category;
