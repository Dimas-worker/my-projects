import BaseComponent from '../../../utils/base-component';
import { getAllCards } from '../../../utils/utils';
import {
  getActiveFiltersFromStorage,
  getFilterConstant,
  setFilterConstant,
  setActiveFiltersInStorage,
} from '../../../utils/localStorage';
import { FilterData, toyData, ActiveFilters } from '../../../constants/interfaces';
import Cards from '../../cards/cards';
import './shape.scss';
import './color.scss';
import './size.scss';

class BaseFilter {
  title: string;

  filtersIcons: BaseComponent;

  cards: Cards;

  allToys: toyData[] = [];

  filtersTypes: FilterData[];

  activeClass: string;

  filterName: string;

  constructor(cards: Cards, filterName: string) {
    this.cards = cards;
    this.filterName = filterName;
    this.title = this.getFilterTitle(filterName);
    getAllCards().then((res: toyData[]): void => {
      this.allToys = res;
    });
    this.activeClass = `active__${filterName}`;
    this.filtersTypes = getFilterConstant(filterName);
    this.filtersIcons = new BaseComponent('div', [filterName], this.title);
    this.renderFilter();
  }

  renderFilter(): void {
    this.filtersTypes.forEach((typeFilter: FilterData): void => {
      const btnType = new BaseComponent('button', [typeFilter.class]);
      if (typeFilter.status) {
        btnType.element.classList.add(this.activeClass);
      }
      this.filtersIcons.element.append(btnType.element);

      btnType.element.addEventListener('click', (): void => {
        const activeFilters = getActiveFiltersFromStorage();
        if (typeFilter.status) {
          btnType.element.classList.remove(this.activeClass);
          typeFilter.status = false;
          activeFilters.forEach((filter: ActiveFilters): void => {
            if (filter.filterName === this.filterName) {
              const numberType = filter.filters.indexOf(typeFilter.ruName);
              filter.filters.splice(numberType, 1);
            }
          });
        } else {
          btnType.element.classList.add(this.activeClass);
          typeFilter.status = true;
          activeFilters.forEach((filter: ActiveFilters): void => {
            if (filter.filterName === this.filterName) {
              filter.filters.push(typeFilter.ruName);
            }
          });
        }
        setFilterConstant(this.filterName, this.filtersTypes);
        setActiveFiltersInStorage(activeFilters);
        this.cards.renderCards();
      });
    });
  }

  getFilterTitle(filterName: string): string {
    switch (filterName) {
      case 'shape':
        return 'Форма: ';
      case 'color':
        return 'Цвет: ';
      case 'size':
        return 'Размер: ';
      default:
        return '';
    }
  }
}

export default BaseFilter;
