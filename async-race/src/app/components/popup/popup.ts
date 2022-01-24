import BaseComponent from '../../shared/base-component';
import './popup.scss';

class Popup extends BaseComponent {
  title: BaseComponent;

  constructor(model: string, time: string) {
    super('div', ['popup']);
    this.title = new BaseComponent('div', ['popup__title']);
    this.title.element.textContent = `The winner is ${model} with time ${time}s! Press reset to be continue.`;
    this.element.append(this.title.element);
  }

  remove(): void {
    this.element.remove();
  }
}

export default Popup;
