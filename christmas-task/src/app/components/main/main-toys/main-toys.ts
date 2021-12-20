import './main-toys.scss';
import BaseComponent from '../../../utils/base-component';
import Cards from '../../cards/cards';
import TypeFilters from '../../type-filters/type-filters';
import RangeFilters from '../../range-filters/range-filters';
import Sorts from '../../sorts/sorts';
import Header from '../../header/header';

class MainToys extends BaseComponent {
  cards: Cards;

  typeFilters: TypeFilters;

  rangeFilters: RangeFilters;

  wrapper: BaseComponent;

  controlsPanel: BaseComponent;

  sorts: Sorts;

  constructor(header: Header) {
    super('div', ['main-toys']);
    this.wrapper = new BaseComponent('div', ['main-toys__wrapper']);
    this.controlsPanel = new BaseComponent('div', ['main-toys__controls']);
    this.cards = new Cards(header);
    this.cards.renderCards();
    this.typeFilters = new TypeFilters(this.cards);
    this.rangeFilters = new RangeFilters(this.cards);
    this.sorts = new Sorts(this.cards, this.rangeFilters, this.typeFilters);
    this.controlsPanel.element.append(this.typeFilters.element, this.rangeFilters.element, this.sorts.element);
    this.wrapper.element.append(this.controlsPanel.element, this.cards.element);
    this.element.append(this.wrapper.element);
  }
}

export default MainToys;
