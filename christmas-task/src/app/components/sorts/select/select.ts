import './select.scss';
import BaseComponent from '../../../utils/base-component';
import Cards from '../../cards/cards';
import { SORTING_OPTIONS } from '../../../constants/constants';

class Select extends BaseComponent {
  wrapper: BaseComponent;
  container: BaseComponent;
  trigger: BaseComponent;
  options: BaseComponent;
  cards: Cards;
  currentSort: string;

  constructor(cards: Cards) {
    super('div', ['select']);
    this.cards = cards;
    this.currentSort = localStorage.getItem('sort') ?? SORTING_OPTIONS[0];
    this.wrapper = new BaseComponent('div', ['select__wrapper']);
    this.container = new BaseComponent('div', ['select__custom']);
    this.trigger = new BaseComponent('div', ['custom__trigger'], this.currentSort);
    this.trigger.element.addEventListener('click', (): void => {
      this.container.element.classList.add('active');
    });
    this.options = new BaseComponent('div', ['custom__options']);
    this.createOptions();
    this.container.element.append(this.trigger.element, this.options.element);
    this.wrapper.element.append(this.container.element);
    this.element.append(this.wrapper.element);
  }

  createOptions(): void {
    SORTING_OPTIONS.forEach((type: string): void => {
      const option: BaseComponent = new BaseComponent('div', ['custom__option'], type);
      option.element.addEventListener('click', (): void => {
        this.trigger.element.textContent = option.element.textContent;
        this.container.element.classList.remove('active');
        const sortName = this.trigger.element.textContent as string;
        localStorage.setItem('sort', sortName);
        this.cards.renderCards();
      });
      this.options.element.append(option.element);
    });
  }
}

export default Select;
