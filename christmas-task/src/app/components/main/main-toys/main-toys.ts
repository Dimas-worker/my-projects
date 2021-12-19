import './main-toys.scss';
import BaseComponent from '../../../utils/base-component';
import Cards from "../../cards/cards";
import TypeFilters from '../../type-filters/type-filters';

class MainToys extends BaseComponent {
  cards: Cards;
  filters: TypeFilters
  wrapper: BaseComponent;
  constructor() {
    super('div', ['main-toys'])
    this.wrapper = new BaseComponent('div', ['main-toys__wrapper']);
    this.cards = new Cards();
    this.cards.renderCards();
    this.filters = new TypeFilters(this.cards);

    this.wrapper.element.append(this.filters.element, this.cards.element);
    this.element.append(this.wrapper.element);
  }
}

export default MainToys;