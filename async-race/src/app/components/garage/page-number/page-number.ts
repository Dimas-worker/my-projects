import './page-number.scss';
import BaseComponent from '../../../shared/base-component';

class PageNumber extends BaseComponent {
  constructor(number: number) {
    super('h2', ['garage-page']);
    this.element.textContent = `Page #${number}`;
  }

  updateValue(number: number): void {
    this.element.textContent = `Page #${number}`;
  }
}

export default PageNumber;
