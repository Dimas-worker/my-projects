import Category from './category';
import { createImgList, createImgOfCategory, createHeader, createNavMenu } from '../components/utils';

class Score extends Category {
  constructor() {
    super();
    this.header = createHeader('Score');
    this.navMenu = createNavMenu('Score');
  }

  createContainerForCards(index) {
    this.cardsContainer = document.createElement('div');
    this.cardsContainer.classList.add('category__card');
    this.cardsContainer.id = index;
    return this.cardsContainer;
  }

  renderCard() {
    this.lists.innerHTML = '';
    this.categories.forEach((el, index) => {
      const card = this.createCard(index, index);
      card.addEventListener('click', (e) => {
        this.getImageOfCategory(e.currentTarget.id);
      });
      this.lists.append(card);
    });
  }

  async showImages(category) {
    const imgList = await createImgList(category);
    this.main.append(imgList);
  }

  getImageOfCategory(category) {
    this.main.innerHTML = '';
    const nameCategory = createImgOfCategory(category);
    this.main.append(nameCategory);
    this.showImages(category);

    nameCategory.addEventListener('click', () => {
      nameCategory.remove();
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

export default Score;
