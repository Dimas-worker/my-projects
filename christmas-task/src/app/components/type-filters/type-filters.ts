import './type-filters.scss';
import BaseComponent from '../../utils/base-component';
import Favorite from './favorite/favorite';
import Cards from '../cards/cards';
import { FILTERS_NAME } from '../../constants/constants';
import BaseFilter from './base-filters/base-filters';

class TypeFilters extends BaseComponent {
  cards: Cards;
  favorite: Favorite;
  title: BaseComponent;

  constructor(cards: Cards) {
    super('div', ['filters']);
    this.cards = cards;
    this.favorite = new Favorite(cards);
    this.title = new BaseComponent('div', ['filters__title'], 'Фильтры по значению');
    this.element.append(this.title.element);
    this.render();
  }

  render() {
    FILTERS_NAME.forEach(el => {
      const filter = new BaseFilter(this.cards, el);
      this.element.append(filter.filtersIcons.element);
    })
    this.element.append(this.favorite.element);
  }
}

export default TypeFilters;
