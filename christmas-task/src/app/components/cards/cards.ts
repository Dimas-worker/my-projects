import './cards.scss';
import BaseComponent from "../../utils/base-component";
import { toyData, getAllCards, rightLetterSort, backLetterSort, rightCountSort, backCountSort, callBackSort } from '../../utils/utils';
import { selectMenu } from '../../constants/constants';
import { getLocalActiveFilters, getLocalActiveRange } from '../../utils/localStorage';
import Card from './card/card';
import Popup from '../popup/popup';

class Cards extends BaseComponent {
  cb: callBackSort;

  constructor() {
    super('div', ['cards']);
    this.cb = rightLetterSort;
  }

  renderCards(): void {
    const allToys: toyData[] = getAllCards();
    const activeFilter = getLocalActiveFilters();
    const activeRange = getLocalActiveRange();
    const activeSort = localStorage.getItem('sort') ?? '';
    this.getSortType(activeSort);
    let resultToys: toyData[] = allToys.filter(toy =>
      activeFilter.length === activeFilter.filter(current =>
        current.filters.length
          ? current.filters.includes(toy[current.filterName])
          : true
      ).length
    )
    .filter(toy => 
      activeRange.length === activeRange.filter(cur =>
        +toy[cur.rangeName] >= +cur.min && +toy[cur.rangeName] <= +cur.max
      ).length
    )
    .sort(this.cb);

    this.element.innerHTML = '';

    if (!resultToys.length) {
      const popup = new Popup('cards');
      document.body.append(popup.element);
    }
    
    resultToys.forEach(el => {
      const toy: Card = new Card(el);
      this.element.append(toy.element);
    })
  }

  getSortType(type: string): void {
    if (selectMenu.indexOf(type) === 1) {
      this.cb = backLetterSort;
    } else if (selectMenu.indexOf(type) === 2) {
      this.cb = rightCountSort;
    } else if (selectMenu.indexOf(type) === 3) {
      this.cb = backCountSort;
    } else {
      this.cb = rightLetterSort;
    }
  }
}

export default Cards;
