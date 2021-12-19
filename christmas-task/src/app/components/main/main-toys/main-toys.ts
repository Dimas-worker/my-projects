import './main-toys.scss';
import BaseComponent from '../../../utils/base-component';
import Cards from "../../cards/cards";
import TypeFilters from '../../type-filters/type-filters';
import RangeFilters from '../../range-filters/range-filters';

class MainToys extends BaseComponent {
  cards: Cards;
  typeFilters: TypeFilters;
  rangeFilters: RangeFilters;
  wrapper: BaseComponent;
  controlsPanel: BaseComponent;

  constructor() {
    super('div', ['main-toys']);
    this.wrapper = new BaseComponent('div', ['main-toys__wrapper']);
    this.controlsPanel = new BaseComponent('div', ['main-toys__controls']);
    this.cards = new Cards();
    this.cards.renderCards();
    this.typeFilters = new TypeFilters(this.cards);
    this.rangeFilters = new RangeFilters(this.cards);
    this.controlsPanel.element.append(this.typeFilters.element, this.rangeFilters.element)
    this.wrapper.element.append(this.controlsPanel.element, this.cards.element);
    this.element.append(this.wrapper.element);
  }
}

export default MainToys;
