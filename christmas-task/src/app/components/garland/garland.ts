import './garland.scss';
import BaseComponent from '../../utils/base-component';
import Switcher from './switcher/switcher';
import { GARLAND_DATA, GARLAND_COLORS } from '../../constants/constants';

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
      const middle = Math.floor(bulbAmount / 2);
      const lightbulb: HTMLLIElement = document.createElement('li');
      lightbulb.classList.add(this.activeClass);
      if (i <= middle) {
        lightbulb.style.transform = `translateY(${i ** 1.8}px)`;
      } else {
        lightbulb.style.transform = `translateY(${j ** 1.8}px)`;
      }
      lightRope.element.append(lightbulb);
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
    const title = new BaseComponent('div', ['garland__title'], 'Гирлянда');
    const buttonsControl = new BaseComponent('div', ['garland__buttons']);

    GARLAND_COLORS.forEach((color: string): void => {
      const button = new BaseComponent('button', ['color-btn', `${color}-btn`]);
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
    this.switcher.checkbox.addEventListener('change', (): void => {
      this.hideGarland();
    });
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
