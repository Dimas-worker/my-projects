import './cards.scss';
import BaseComponent from '../../utils/base-component';
import {
  getAllCards,
  rightLetterSort,
  backLetterSort,
  rightCountSort,
  backCountSort,
  callBackSort,
} from '../../utils/utils';
import { toyData } from '../../constants/interface';
import { SORTING_OPTIONS } from '../../constants/constants';
import { getLocalActiveFilters, getLocalActiveRange } from '../../utils/localStorage';
import Card from './card/card';
import Popup from '../popup/popup';
import Header from '../header/header';

class Cards extends BaseComponent {
  cb: callBackSort;

  popup: Popup | null = null;

  header: Header;

  textInput: string;

  constructor(header: Header) {
    super('div', ['cards']);
    this.header = header;
    this.cb = rightLetterSort;

    this.textInput = '';
    const input = this.header.search.inputField;
    input.addEventListener('input', (): void => {
      console.log('input');
      this.textInput = input.value.toLowerCase();
      this.renderCards();
    });
  }

  async renderCards(): Promise<void> {
    console.log('render');

    const allToys: toyData[] = await getAllCards();
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
      console.log(this.popup);

      if (!this.popup) {
        this.popup = new Popup('cards');
        this.popup.continueBtn.element.addEventListener('click', () => {
          this.popup?.remove();
          this.popup = null;
        });
        document.body.append(this.popup.element);
      }
    }

    resultToys.forEach((el): void => {
      const toy: Card = new Card(el, this.header);
      this.element.append(toy.element);
    });
  }

  getSortType(type: string): void {
    if (SORTING_OPTIONS.indexOf(type) === 1) {
      this.cb = backLetterSort;
    } else if (SORTING_OPTIONS.indexOf(type) === 2) {
      this.cb = rightCountSort;
    } else if (SORTING_OPTIONS.indexOf(type) === 3) {
      this.cb = backCountSort;
    } else {
      this.cb = rightLetterSort;
    }
  }
}

export default Cards;
