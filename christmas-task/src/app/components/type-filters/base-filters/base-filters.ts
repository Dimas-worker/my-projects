import BaseComponent from '../../../utils/base-component';
import { getAllCards, toyData } from '../../../utils/utils';
import { getLocalActiveFilters, getFilterConstant, setFilterConstant, setLocalActiveFilters } from '../../../utils/localStorage';
import { FilterData } from '../../../constants/constants';
import Cards from '../../cards/cards';
import './shape.scss';
import './color.scss';
import './size.scss';

class BaseFilter {
  title: string;
  filtersIcons: BaseComponent;
  cards: Cards;
  allToys: toyData[];
  filterTypes: FilterData[];
  activeClass: string;
  filterName: string;

  constructor(cards: Cards, filterName: string) {
    this.cards = cards;
    this.filterName = filterName;
    this.title = this.getTitle(filterName);
    this.allToys = getAllCards();
    this.activeClass = `active_${filterName}`;
    this.filterTypes = getFilterConstant(filterName);
    this.filtersIcons = new BaseComponent('div', [filterName], this.title);
    this.renderFilter();
  }

  renderFilter() {
    this.filterTypes.forEach(type => {
      const btnType = new BaseComponent('button', [type.class]);
      if (type.status) {
        btnType.element.classList.add(this.activeClass);
      }
      this.filtersIcons.element.append(btnType.element);

      btnType.element.addEventListener('click', () => {
        const activeFilters = getLocalActiveFilters();
        if (type.status) {
          btnType.element.classList.remove(this.activeClass);
          type.status = false;
          activeFilters.forEach(el => {
            if (el.filterName === this.filterName) {
              let numberType = el.filters.indexOf(type.ruName)
              el.filters.splice(numberType, 1)
            }
          })
        } else {
          btnType.element.classList.add(this.activeClass);
          type.status = true;
          activeFilters.forEach(el => {
            if (el.filterName === this.filterName) {
              el.filters.push(type.ruName);
            }
          })
        }
        setFilterConstant(this.filterName, this.filterTypes);
        setLocalActiveFilters(activeFilters);
        this.cards.renderCards();
      })
    })
  }

  getTitle(filterName: string): string {
    let res: string;
    switch (filterName) {
      case 'shape':
        return res = 'Форма: ';
      case 'color':
        return res = 'Цвет: ';
      case 'size':
        return res = 'Размер: ';
      default:
        return res = '';
    }
  }
}

export default BaseFilter;
