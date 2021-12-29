import './garland.scss';
import BaseComponent from '../../utils/base-component';
import Switcher from './switcher/switcher';
import { GARLAND_DATA, GARLAND_COLORS, DISTANCE_BETWEEN_BULBS } from '../../constants/constants';

class Garland {
  buttonContainer: BaseComponent;
  activeClass: string;
  garland: BaseComponent;
  switcher: Switcher;

  constructor() {
    this.garland = new BaseComponent('div', ['garland', 'hidden__garland']);
    this.buttonContainer = new BaseComponent('div', ['garland__container']);
    this.activeClass = 'all-color';
    this.switcher = new Switcher();

    this.checkedLocal();
    this.switchGarland();
    this.createGarland();
    this.createButtons();
  }

  createRope(bulbAmount: number, level: number): void {
    const lightRope: BaseComponent = new BaseComponent('ul', ['light-rope', `garland__position_${level}`]);
    for (let i = 1, j = bulbAmount; i <= bulbAmount; i++, j--) {
      const middle: number = Math.floor(bulbAmount / 2);
      const lightBulb: HTMLLIElement = document.createElement('li');
      lightBulb.classList.add(this.activeClass);
      lightBulb.style.transform = `translateY(${i <= middle ? i : j} ** ${DISTANCE_BETWEEN_BULBS}px)`;
      lightRope.element.append(lightBulb);
    }
    this.garland.element.append(lightRope.element);
  }

  createGarland(): void {
    GARLAND_DATA.forEach((rope: number[]): void => {
      this.createRope(rope[0], rope[1]);
    });
  }

  hideGarland(): void {
    if (this.switcher.checkbox.checked) {
      localStorage.setItem('garland', `${this.activeClass}`);
      this.garland.element.classList.remove('hidden__garland');
    } else {
      this.garland.element.classList.add('hidden__garland');
      localStorage.setItem('garland', '');
    }
  }

  createButtons(): void {
    const title: BaseComponent = new BaseComponent('div', ['garland__title'], 'Гирлянда');
    const buttonsControl: BaseComponent = new BaseComponent('div', ['garland__buttons']);

    GARLAND_COLORS.forEach((color: string): void => {
      const button: BaseComponent = new BaseComponent('button', ['color-btn', `${color}-btn`]);
      button.element.addEventListener('click', (): void => {
        this.switcher.checkbox.checked = true;
        this.hideGarland();
        this.garland.element.innerHTML = '';
        this.activeClass = `${color}-color`;
        this.createGarland();
        localStorage.setItem('garland', `${color}-color`);
      });
      buttonsControl.element.append(button.element);
    });
    buttonsControl.element.append(this.switcher.element);
    this.buttonContainer.element.append(title.element, buttonsControl.element);
  }

  switchGarland(): void {
    this.switcher.checkbox.addEventListener('change', (): void => this.hideGarland());
  }

  checkedLocal(): void {
    if (localStorage.getItem('garland')) {
      this.activeClass = localStorage.getItem('garland') as string;
      this.switcher.checkbox.checked = true;
      this.hideGarland();
    }
  }
}

export default Garland;
