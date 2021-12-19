import BaseComponent from '../../../utils/base-component';
import { toyData, createProperty } from '../../../utils/utils'; 
import './card.scss';

class Card extends BaseComponent {
  descriptions: BaseComponent;

  constructor(data: toyData) {
    super('div', ['toy'])
    this.descriptions = new BaseComponent('div', ['toy__description']);
    this.getDate(data);
  }

  getDate(data: toyData): void {
    for (const key in data) {
      if (key === 'name') {
        const title = new BaseComponent('h2', ['toy__title'], data[key]);
        this.element.prepend(title.element);
      } else if (key === 'num') {
        const img = new BaseComponent('img', ['toy__img']);
        img.element.setAttribute('src', `./assets/toys/${data[key]}.png`);
        img.element.setAttribute('alt', `tou-${data[key]}`);
        this.element.append(img.element);
      } else if (key === 'count' || key === 'year' || key === 'shape' || key === 'color' || key === 'size') {
        const property = createProperty(key, data[key]);
        this.descriptions.element.append(property);
      } else if (key === 'favorite') {
        const favorite = createProperty(key, `${data[key] ? 'да' : 'нет'}`);
        this.descriptions.element.append(favorite);
      }
    }
    this.element.append(this.descriptions.element);
  }
}

export default Card;
