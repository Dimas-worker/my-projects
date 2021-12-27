import './switcher.scss';
import BaseComponent from '../../../utils/base-component';

class Switcher extends BaseComponent {
  checkbox: HTMLInputElement;
  slider: HTMLElement;

  constructor() {
    super('label', ['switch']);
    this.checkbox = document.createElement('input');
    this.checkbox.type = 'checkbox';
    this.checkbox.checked = false;
    this.slider = document.createElement('span');
    this.slider.classList.add('slider', 'round');
    this.element.append(this.checkbox, this.slider);
  }
}

export default Switcher;
