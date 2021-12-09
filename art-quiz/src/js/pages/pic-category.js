import Category from './category';
import Header from '../components/header';
import NavMenu from '../components/nav-menu';
import { CATEGORIES_IN_GAME } from '../components/constants'

class PicCategory extends Category {
  constructor() {
    super();
    this.nextPartCategories = CATEGORIES_IN_GAME / 2;
    this.isPicGame = true;
    this.header = new Header('Categories', this.isPicGame);
    this.navMenu = new NavMenu('Categories', this.isPicGame);
  }

  renderCard() {
    this.lists.innerHTML = '';
    this.categories.forEach((el, index) => {
      const i = this.nextPartCategories + index;
      const card = this.createCard(i, 'pic-game');
      this.lists.append(card);
    });
  }
}

export default PicCategory;
