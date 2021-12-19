import BaseComponent from '../../../utils/base-component';
import { ActiveFilters, FilterData } from '../../../constants/constants';
import { getLocalData, getFilterConstant, setFilterConstant, setLocalActiveFilters } from '../../../utils/localStorage';
import Cards from '../../cards/cards';
import './favorite.scss';

class Favorite extends BaseComponent {
  container: BaseComponent;
  input: HTMLInputElement;
  label: BaseComponent;
  cards: Cards;
  filterName: string;
  activeFilters: ActiveFilters[];
  filterTypes: FilterData[];

  constructor(cards: Cards) {
    super('div', ['favorite'], 'Только любимые: ');
    this.cards = cards;
    this.filterName = 'favorite';
    this.activeFilters = getLocalData();
    this.container = new BaseComponent('div', ['favorite__container']);
    this.label = new BaseComponent('label', ['favorite_label']);
    this.filterTypes = getFilterConstant(this.filterName);
    if (this.filterTypes[0].status) {
      this.label.element.classList.add('active__favorite')
    }
    this.input = document.createElement('input');
    this.input.classList.add('favorite_input')
    this.input.setAttribute('type', 'checkbox');

    this.label.element.append(this.input)
    this.container.element.append(this.label.element);
    this.element.append(this.container.element);
    this.renderFilter();
  }
  
  renderFilter() {
    this.input.addEventListener('change', () => {
      if (this.input.checked) {
        this.label.element.classList.add('active__favorite');
      } else {
        this.label.element.classList.remove('active__favorite');
      }
      this.activeFilters.forEach(el => {
        if (el.filterName === this.filterName) {
          el.filters[0] = (this.input.checked);
        }
      })
      this.filterTypes[0].status = this.input.checked;
      setFilterConstant(this.filterName, this.filterTypes);
      setLocalActiveFilters(this.activeFilters);
      this.cards.renderCards();
    })
  }
}

export default Favorite;
