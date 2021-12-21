import './cards.scss';
import BaseComponent from '../../utils/base-component';
import {
  toyData,
  getAllCards,
  rightLetterSort,
  backLetterSort,
  rightCountSort,
  backCountSort,
  callBackSort,
} from '../../utils/utils';
import { selectMenu } from '../../constants/constants';
import { getLocalActiveFilters, getLocalActiveRange } from '../../utils/localStorage';
import Card from './card/card';
import Popup from '../popup/popup';
import Header from '../header/header';

class Cards extends BaseComponent {
  cb: callBackSort;

  header: Header;

  textInput: string;

  constructor(header: Header) {
    super('div', ['cards']);
    this.header = header;
    this.cb = rightLetterSort;
    this.textInput = '';
    const input = document.querySelector('.search__input') as HTMLInputElement;
    input?.addEventListener('input', (): void => {
      this.textInput = input.value.toLowerCase();
      this.renderCards();
    });
  }

  renderCards(): void {
    const allToys: toyData[] = getAllCards();
    const activeFilter = getLocalActiveFilters();
    const activeRange = getLocalActiveRange();
    const activeSort = localStorage.getItem('sort') ?? '';
    this.getSortType(activeSort);
    const resultToys: toyData[] = allToys
      .filter(
        (toy) =>
          activeFilter.length ===
          activeFilter.filter((current) =>
            current.filters.length ? current.filters.includes(toy[current.filterName]) : true
          ).length
      )
      .filter(
        (toy) =>
          activeRange.length ===
          activeRange.filter((cur) => +toy[cur.rangeName] >= +cur.min && +toy[cur.rangeName] <= +cur.max).length
      )
      .sort(this.cb)
      .filter((toy) => toy.name.toLowerCase().includes(this.textInput));

    this.element.innerHTML = '';

    if (!resultToys.length) {
      const popup = new Popup('cards');
      document.body.append(popup.element);
    }

    resultToys.forEach((el): void => {
      const toy: Card = new Card(el, this.header);
      this.element.append(toy.element);
    });
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
