import { ART_CATEGORIES } from '../components/constants';
import Header from '../components/header';
import NavMenu from '../components/nav-menu';
import Footer from '../components/footer';

class Category {
  constructor() {
    this.categories = ART_CATEGORIES;
    this.container = document.body;

    this.section = document.createElement('div');
    this.section.classList.add('wrapper', 'categories__wrapper');

    this.header = new Header('Categories');

    this.main = document.createElement('div');
    this.main.classList.add('categories__main');
    this.main.innerHTML = '<h3>Categories</h3><div class="categories__list"></div>';

    this.lists = document.createElement('div');
    this.lists.classList.add('categories__list_inner');
    
    this.navMenu = new NavMenu('Categories');

    this.footer = new Footer();

    this.main.lastElementChild.append(this.lists);
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

  createContainerForCards(linkGame) {
    const cardsContainer = document.createElement('a');
    cardsContainer.classList.add('category__card');
    cardsContainer.href = `./#/${linkGame}`;
    return cardsContainer;
  }

  createCard(index, linkGame) {
    const countCategories = this.categories.length;
    const curCardObj = JSON.parse(localStorage.getItem('answer'))[index];
    const count = curCardObj.correct;
    const cardsContainer = this.createContainerForCards(linkGame);
    cardsContainer.innerHTML = `
      <div class="heading__card">
        <h4>${this.categories[index % countCategories]}</h4>
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
      const card = this.createCard(index, 'art-game');
      this.lists.append(card);
    });
  }

  render() {
    this.renderHTML();
    this.renderCard();
  }
}

export default Category;
