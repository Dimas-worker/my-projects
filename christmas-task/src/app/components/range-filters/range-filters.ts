import './range-filters.scss';
import BaseComponent from '../../utils/base-component';
import Cards from '../cards/cards';
import BaseRange from './base-range/base-range';

class RangeFilters extends BaseComponent {
  cards: Cards;

  title: BaseComponent;

  rangeCount: BaseRange;

  rangeYear: BaseRange;

  constructor(cards: Cards) {
    super('div', ['range-filters']);
    this.cards = cards;
    this.title = new BaseComponent('div', ['range-filters__title'], 'Фильтры по диапазону');
    this.rangeCount = new BaseRange(this.cards, 'count');
    this.rangeYear = new BaseRange(this.cards, 'year');
    this.element.append(this.title.element, this.rangeCount.element, this.rangeYear.element);
  }
}

export default RangeFilters;
