import './select.scss';
import BaseComponent from '../../../utils/base-component';
import Cards from '../../cards/cards';
import { selectMenu } from '../../../constants/constants';

class Select extends BaseComponent {
  wrapper: BaseComponent;

  custom: BaseComponent;

  trigger: BaseComponent;

  options: BaseComponent;

  cards: Cards;

  constructor(cards: Cards) {
    super('div', ['select']);
    this.cards = cards;
    this.wrapper = new BaseComponent('div', ['selectWrapper']);
    this.custom = new BaseComponent('div', ['selectCustom', 'js-selectCustom']);
    this.trigger = new BaseComponent('div', ['selectCustom-trigger'], selectMenu[0]);
    this.trigger.element.addEventListener('click', () => {
      this.custom.element.classList.add('isActive');
    });
    this.options = new BaseComponent('div', ['selectCustom-options']);
    this.creatOptions();
    this.custom.element.append(this.trigger.element, this.options.element);
    this.wrapper.element.append(this.custom.element);
    this.element.append(this.wrapper.element);
  }

  creatOptions(): void {
    selectMenu.forEach((el) => {
      const option = new BaseComponent('div', ['selectCustom-option'], el);
      option.element.addEventListener('click', () => {
        this.trigger.element.textContent = option.element.textContent;
        this.custom.element.classList.remove('isActive');
        const sortName: string = this.trigger.element.textContent as string;
        localStorage.setItem('sort', sortName);
        this.cards.renderCards();
      });
      this.options.element.append(option.element);
    });
  }
}

export default Select;
