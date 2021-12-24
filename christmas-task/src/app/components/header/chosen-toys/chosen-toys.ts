import BaseComponent from '../../../utils/base-component';
import './chosen-toys.scss';
import { getChosenToys } from '../../../utils/localStorage';

class ChosenToys extends BaseComponent {
  constructor() {
    super('div', ['chosen-toys']);
    this.setCountToys();
  }

  setCountToys(): void {
    this.element.innerHTML = '';
    const currentChosenToys: string[] = getChosenToys();
    const countOfChosenToys = currentChosenToys.length.toString();
    const countOfToys = new BaseComponent('span', ['chosen-toys__count'], countOfChosenToys);
    this.element.append(countOfToys.element);
  }
}

export default ChosenToys;
