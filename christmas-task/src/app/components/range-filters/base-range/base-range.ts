import * as noUiSlider from 'nouislider';
import 'nouislider/dist/nouislider.css';
import './base-range.scss';
import BaseComponent from '../../../utils/base-component';
import { getActiveRangeFromStorage, setActiveRangeInStorage } from '../../../utils/localStorage';
import { ALL_RANGES } from '../../../constants/constants';
import { ActiveRange } from '../../../constants/interfaces';
import Cards from '../../cards/cards';
import { RangeType } from '../../../constants/interfaces';

const enum TitleName {
  count = 'Количество экземпляров:',
  year = 'Год приобретения:',
}

class BaseRange extends BaseComponent {
  slider: noUiSlider.target;

  minRange: BaseComponent;

  maxRange: BaseComponent;

  title: BaseComponent;

  container: BaseComponent;

  name: string;

  cards: Cards;

  constructor(cards: Cards, name: string, titleName: TitleName) {
    super('div', [name]);
    this.cards = cards;
    this.name = name;
    this.container = new BaseComponent('div', [`${name}__container`]);
    this.title = new BaseComponent('div', [`${name}__title`], titleName);
    this.slider = document.createElement('div');
    this.slider.classList.add(`${name}__slider`);

    this.minRange = new BaseComponent('span', [`${name}__output`]);
    this.maxRange = new BaseComponent('span', [`${name}__output`]);

    this.createRange();

    this.container.element.append(this.minRange.element, this.slider, this.maxRange.element);
    this.element.append(this.title.element, this.container.element);
  }

  createRange(): void {
    ALL_RANGES.forEach((range: RangeType): void => {
      if (range.name === this.name) {
        noUiSlider.create(this.slider, {
          start: [range.min, range.max],
          step: range.step,
          connect: true,
          range: {
            min: range.min,
            max: range.max,
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

    const defaultRanges = getActiveRangeFromStorage()
      .filter((range: ActiveRange): boolean => range.rangeName === this.name)
      .map((range: ActiveRange): string[] => [range.min, range.max])
      .flat();
    this.setDefaultRange(defaultRanges);

    this.slider.noUiSlider?.on('slide', (values: Array<string | number>, handle: number): void => {
      this.setRange(values, handle);
    });
  }

  setRange(value: Array<string | number>, handle: number): void {
    const activeRanges: ActiveRange[] = getActiveRangeFromStorage();
    const snapValues = [this.minRange.element, this.maxRange.element];
    snapValues[handle].textContent = value[handle] as string;
    activeRanges.forEach((range: ActiveRange): void => {
      if (range.rangeName === this.name) {
        range.min = this.minRange.element.textContent as string;
        range.max = this.maxRange.element.textContent as string;
      }
    });
    setActiveRangeInStorage(activeRanges);
    this.cards.renderCards();
  }

  setDefaultRange(value: string[]): void {
    const activeRange: ActiveRange[] = getActiveRangeFromStorage();
    const snapValues: HTMLElement[] = [this.minRange.element, this.maxRange.element];
    snapValues.forEach((range: HTMLElement, index: number) => {
      range.textContent = value[index];
    });
    activeRange.forEach((range: ActiveRange): void => {
      if (range.rangeName === this.name) {
        range.min = this.minRange.element.textContent as string;
        range.max = this.maxRange.element.textContent as string;
      }
    });
    this.slider.noUiSlider?.set(value);
    setActiveRangeInStorage(activeRange);
  }
}

export { TitleName };
export default BaseRange;
