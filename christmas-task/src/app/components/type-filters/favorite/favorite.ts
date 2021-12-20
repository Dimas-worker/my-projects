import BaseComponent from '../../../utils/base-component';
import { ActiveFilters, FilterData } from '../../../constants/constants';
import {
  getLocalActiveFilters,
  getFilterConstant,
  setFilterConstant,
  setLocalActiveFilters,
} from '../../../utils/localStorage';
import Cards from '../../cards/cards';
import './favorite.scss';

class Favorite extends BaseComponent {
  container: BaseComponent;

  input: HTMLInputElement;

  label: BaseComponent;

  cards: Cards;

  filterName: string;

  constructor(cards: Cards) {
    super('div', ['favorite'], 'Только любимые: ');
    this.cards = cards;
    this.filterName = 'favorite';
    this.container = new BaseComponent('div', ['favorite__container']);
    this.label = new BaseComponent('label', ['favorite_label']);
    this.input = document.createElement('input');
    this.input.classList.add('favorite_input');
    this.input.setAttribute('type', 'checkbox');

    this.renderFilter();
    this.label.element.append(this.input);
    this.container.element.append(this.label.element);
    this.element.append(this.container.element);
  }

  renderFilter() {
    const filterTypes: FilterData[] = getFilterConstant(this.filterName);
    if (filterTypes[0].status) {
      this.label.element.classList.add('active__favorite');
    } else {
      this.label.element.classList.remove('active__favorite');
    }

    this.input.addEventListener('change', () => {
      const activeFilters: ActiveFilters[] = getLocalActiveFilters();
      if (this.input.checked) {
        this.label.element.classList.add('active__favorite');
      } else {
        this.label.element.classList.remove('active__favorite');
      }
      activeFilters.forEach((el) => {
        if (el.filterName === this.filterName) {
          el.filters[0] = this.input.checked;
        }
      });
      filterTypes[0].status = this.input.checked;
      setFilterConstant(this.filterName, filterTypes);
      setLocalActiveFilters(activeFilters);
      this.cards.renderCards();
    });
  }
}

export default Favorite;
