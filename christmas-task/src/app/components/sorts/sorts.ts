import BaseComponent from '../../utils/base-component';
import Select from './select/select';
import './sorts.scss';
import Cards from '../cards/cards';
import ResetButton from './reset-btn/reset-btn';
import RangeFilters from '../range-filters/range-filters';
import TypeFilters from '../type-filters/type-filters';
import ResetLocal from './reset-local/reset-local';

class Sorts extends BaseComponent {
  select: Select;

  title: BaseComponent;

  cards: Cards;

  reset: ResetButton;

  resetLocal: ResetLocal;

  range: RangeFilters;

  typeFilters: TypeFilters;

  container: BaseComponent;

  constructor(cards: Cards, range: RangeFilters, typeFilters: TypeFilters) {
    super('div', ['sorts']);
    this.cards = cards;
    this.range = range;
    this.typeFilters = typeFilters;
    this.title = new BaseComponent('div', ['sorts__title'], 'сортировка');
    this.container = new BaseComponent('div', ['sorts__container']);
    this.select = new Select(this.cards);
    this.resetLocal = new ResetLocal();
    this.reset = new ResetButton(this.range, this.cards, this.typeFilters);
    this.container.element.append(this.select.element, this.reset.element, this.resetLocal.element);
    this.element.append(this.title.element, this.container.element);
  }
}

export default Sorts;
