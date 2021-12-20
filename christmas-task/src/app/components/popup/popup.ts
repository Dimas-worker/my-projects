import BaseComponent from "../../utils/base-component";
import './popup.scss';
import { Title } from '../range-filters/base-range/base-range';

const titlePopup: Title = {
  slots: 'Извините, все слоты заполнены',
  cards: "Извините, совпадений не обнаружено"
}

class Popup extends BaseComponent {
  content: BaseComponent;
  title: BaseComponent;
  continueBtn: BaseComponent;
  
  constructor(title: string) {
    super('div', ['popup']);
    this.content = new BaseComponent('div', ['popup__content']);
    this.title = new BaseComponent('div', ['popup-title'], titlePopup[title]);
    this.continueBtn = new BaseComponent('button', ['btn-cont'], 'continue');
    this.continueBtn.element.addEventListener('click', () => {
      this.remove();
    })
    this.content.element.append(this.title.element, this.continueBtn.element);
    this.element.append(this.content.element);
  }
  remove():void {
    this.element.remove();
  }
}

export default Popup;