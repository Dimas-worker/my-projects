import BaseComponent from '../../../utils/base-component';
import { createProperty } from '../../../utils/utils';
import { toyData } from '../../../constants/interfaces';
import { getChosenToysFromStorage, setChosenToysInStorage } from '../../../utils/localStorage';
import { CHOSEN_TOYS_MAX_AMOUNT } from '../../../constants/constants';
import './card.scss';
import Popup from '../../popup/popup';
import Header from '../../header/header';
import { TitlePopup } from '../../popup/popup';

class Card extends BaseComponent {
  descriptions: BaseComponent;

  chosenToys: string[];

  header: Header;

  popup: Popup | null = null;

  constructor(data: toyData, header: Header) {
    super('div', ['card']);
    this.header = header;
    this.descriptions = new BaseComponent('div', ['card__description']);
    this.chosenToys = getChosenToysFromStorage();
    this.element.addEventListener('click', (): void => {
      this.toggleCardForChosen(this.element, data);
    })
    this.renderCards(data);
  }

  renderCards(data: toyData): void {
    for (const key in data) {
      if (key === 'name') {
        const title = new BaseComponent('h2', ['card__title'], data[key]);
        this.element.prepend(title.element);
      } else if (key === 'num') {
        const img = new BaseComponent('img', ['card__img']);
        img.element.setAttribute('src', `./assets/toys/${data[key]}.png`);
        img.element.setAttribute('alt', `card-${data[key]}`);
        this.element.append(img.element);
      } else if (key === 'count' || key === 'year' || key === 'shape' || key === 'color' || key === 'size') {
        const property = createProperty(key, data[key]);
        this.descriptions.element.append(property);
      } else if (key === 'favorite') {
        const favorite = createProperty(key, `${data[key] ? 'да' : 'нет'}`);
        this.descriptions.element.append(favorite);
      }

      if (this.chosenToys.includes(data.num)) {
        this.element.classList.add('active__toy');
      }
    }
    this.element.append(this.descriptions.element);
    const ribbon = new BaseComponent('div', ['card__ribbon']);
    this.element.append(ribbon.element);
  }

  toggleCardForChosen(card: HTMLElement, data: toyData): void {
    const updateChosenToys: string[] = getChosenToysFromStorage();
    if (card.classList.contains('active__toy')) {
      const toyIndex = updateChosenToys.indexOf(data.num);
      updateChosenToys.splice(toyIndex, 1);
    } else {
      if (updateChosenToys.length === CHOSEN_TOYS_MAX_AMOUNT && !this.popup) {
        this.popup = new Popup(TitlePopup.slots);
        this.popup.continueBtn.element.addEventListener('click', () => {
          this.popup?.remove();
          this.popup = null;
        });
        document.body.append(this.popup.element);
        return;
      }
      updateChosenToys.push(data.num);
    }
    setChosenToysInStorage(updateChosenToys);
    card.classList.toggle('active__toy');
    this.header.updateChosenToys();
  }
}

export default Card;
