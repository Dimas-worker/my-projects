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
import { toyData } from '../../constants/interfaces';
import { SORTING_OPTIONS } from '../../constants/constants';
import { getActiveFiltersFromStorage, getActiveRangeFromStorage } from '../../utils/localStorage';
import Card from './card/card';
import Popup from '../popup/popup';
import Header from '../header/header';
import { TitlePopup } from '../popup/popup';

class Cards extends BaseComponent {
  sortCards: callBackSort;

  popup: Popup | null = null;

  header: Header;

  textInput: string;

  constructor(header: Header) {
    super('div', ['cards']);
    this.header = header;
    this.sortCards = rightLetterSort;

    this.textInput = '';
    const input = this.header.search.inputField;
    input.addEventListener('input', (): void => {
      this.textInput = input.value.toLowerCase();
      this.renderCards();
    });
  }

  async renderCards(): Promise<void> {
    const resultToys: toyData[] = await this.getToysAfterFilters()

    this.element.innerHTML = '';

    if (!resultToys.length) {
      if (!this.popup) {
        this.popup = new Popup(TitlePopup.cards);
        this.popup.continueBtn.element.addEventListener('click', () => {
          this.popup?.remove();
          this.popup = null;
        });
        document.body.append(this.popup.element);
      }
    }

    resultToys.forEach((toy): void => {
      const card: Card = new Card(toy, this.header);
      this.element.append(card.element);
    });
  }

  getSortType(type: string): void {
    switch (SORTING_OPTIONS.indexOf(type)) {
      case 1:
        this.sortCards = backLetterSort;
        break;
      case 2:
        this.sortCards = rightCountSort;
        break;
      case 3:
        this.sortCards = backCountSort;
        break;
      default:
        this.sortCards = rightLetterSort;
    }
  }

  async getToysAfterFilters(): Promise<toyData[]> {
    const allToys: toyData[] = await getAllCards();
    const activeFilter = getActiveFiltersFromStorage();
    const activeRange = getActiveRangeFromStorage();
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
      .sort(this.sortCards)
      .filter((toy) => toy.name.toLowerCase().includes(this.textInput));
    return resultToys;
  }
}

export default Cards;
