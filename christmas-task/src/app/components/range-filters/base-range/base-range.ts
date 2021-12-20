import * as noUiSlider from 'nouislider';
import 'nouislider/dist/nouislider.css';
import './base-range.scss';
import BaseComponent from '../../../utils/base-component';
import { getLocalActiveRange, setLocalActiveRange } from '../../../utils/localStorage';
import { ActiveRange, ALL_RANGES, RangeType } from '../../../constants/constants';
import Cards from '../../cards/cards';

type Title = {
  [key: string]: string;
};

const titleName: Title = {
  count: 'Количество экземпляров:',
  year: 'Год приобретения:',
};

class BaseRange extends BaseComponent {
  slider: noUiSlider.target;

  minRange: BaseComponent;

  maxRange: BaseComponent;

  title: BaseComponent;

  container: BaseComponent;

  name: string;

  cards: Cards;

  constructor(cards: Cards, name: string) {
    super('div', [name]);
    this.cards = cards;
    this.name = name;
    this.container = new BaseComponent('div', [`${name}__container`]);
    this.title = new BaseComponent('div', [`${name}__title`], titleName[name]);
    this.slider = document.createElement('div');
    this.slider.classList.add(`${name}__slider`);

    ALL_RANGES.forEach((el) => {
      if (el.name === this.name) {
        noUiSlider.create(this.slider, {
          start: [el.min, el.max],
          step: el.step,
          connect: true,
          range: {
            min: el.min,
            max: el.max,
          },
          format: {
            to(value) {
              return Math.round(value);
            },
            from(value) {
              return Number(value);
            },
          },
        });
      }
    });

    this.minRange = new BaseComponent('span', [`${name}__output`]);
    this.maxRange = new BaseComponent('span', [`${name}__output`]);

    const defaultValue = this.slider.noUiSlider?.get() as Array<string>;
    this.setDefaultRange(defaultValue);

    this.slider.noUiSlider?.on('slide', (values, handle): void => {
      this.setRange(values, handle);
    });

    this.container.element.append(this.minRange.element, this.slider, this.maxRange.element);
    this.element.append(this.title.element, this.container.element);
  }

  setRange(value: Array<string | number>, handle: number): void {
    const activeRange: ActiveRange[] = getLocalActiveRange();
    const snapValues = [this.minRange.element, this.maxRange.element];
    snapValues[handle].textContent = value[handle] as string;
    activeRange.forEach((el) => {
      if (el.rangeName === this.name) {
        el.min = this.minRange.element.textContent as string;
        el.max = this.maxRange.element.textContent as string;
      }
    });
    setLocalActiveRange(activeRange);
    this.cards.renderCards();
  }

  setDefaultRange(value: Array<string>) {
    const activeRange: ActiveRange[] = getLocalActiveRange();
    const snapValues = [this.minRange.element, this.maxRange.element];
    snapValues.forEach((el, index) => {
      el.textContent = value[index];
    });
    activeRange.forEach((el) => {
      if (el.rangeName === this.name) {
        el.min = this.minRange.element.textContent as string;
        el.max = this.maxRange.element.textContent as string;
      }
    });
    setLocalActiveRange(activeRange);
  }
}

export { Title };
export default BaseRange;
