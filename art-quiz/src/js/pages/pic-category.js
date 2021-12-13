import Category from './category';
import { createHeader, createNavMenu } from '../components/utils';

import { CATEGORIES_IN_GAME_AMOUNT } from '../components/constants'

class PicCategory extends Category {
  constructor() {
    super();
    this.nextPartCategories = CATEGORIES_IN_GAME_AMOUNT / 2;
    this.isPicGame = true;
    this.header = createHeader('Categories', this.isPicGame);
    this.navMenu = createNavMenu('Categories', this.isPicGame);
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
