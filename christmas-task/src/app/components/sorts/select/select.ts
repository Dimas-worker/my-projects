import './select.scss';
import BaseComponent from '../../../utils/base-component';
import Cards from '../../cards/cards';
import { SORTING_OPTIONS } from '../../../constants/constants';

class Select extends BaseComponent {
  wrapper: BaseComponent;

  custom: BaseComponent;

  trigger: BaseComponent;

  options: BaseComponent;

  cards: Cards;

  currentSort: string;

  constructor(cards: Cards) {
    super('div', ['select']);
    this.cards = cards;
    this.currentSort = localStorage.getItem('sort') ?? SORTING_OPTIONS[0];
    this.wrapper = new BaseComponent('div', ['select__wrapper']);
    this.custom = new BaseComponent('div', ['select__custom']);
    this.trigger = new BaseComponent('div', ['custom__trigger'], this.currentSort);
    this.trigger.element.addEventListener('click', () => {
      this.custom.element.classList.add('isActive');
    });
    this.options = new BaseComponent('div', ['custom__options']);
    this.createOptions();
    this.custom.element.append(this.trigger.element, this.options.element);
    this.wrapper.element.append(this.custom.element);
    this.element.append(this.wrapper.element);
  }

  createOptions(): void {
    SORTING_OPTIONS.forEach((type) => {
      const option = new BaseComponent('div', ['custom__option'], type);
      option.element.addEventListener('click', () => {
        this.trigger.element.textContent = option.element.textContent;
        this.custom.element.classList.remove('isActive');
        const sortName = this.trigger.element.textContent as string;
        localStorage.setItem('sort', sortName);
        this.cards.renderCards();
      });
      this.options.element.append(option.element);
    });
  }
}

export default Select;
