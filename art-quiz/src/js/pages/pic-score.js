import PicCategory from './pic-category';
import Header from '../components/header';
import NavMenu from '../components/nav-menu';
import { createImgList, createImgOfCategory } from '../components/utils';

class PicScore extends PicCategory {
  constructor() {
    super();
    this.header = new Header('Score', this.isPicGame);
    this.navMenu = new NavMenu('Score', this.isPicGame);
  }

  createContainerForCards(index) {
    const cardsContainer = document.createElement('div');
    cardsContainer.classList.add('category__card');
    cardsContainer.id = index;
    return cardsContainer;
  }

  renderCard() {
    this.lists.innerHTML = '';
    this.categories.forEach((el, index) => {
      const i = this.nextPartCategories + index;
      const card = this.createCard(i, i);
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

export default PicScore;
