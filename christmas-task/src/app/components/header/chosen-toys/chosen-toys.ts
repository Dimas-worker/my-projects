import BaseComponent from '../../../utils/base-component';
import './chosen-toys.scss';
import { getChosenToysFromStorage } from '../../../utils/localStorage';

class ChosenToys extends BaseComponent {
  constructor() {
    super('div', ['chosen-toys']);
    this.setCountToys();
  }

  setCountToys(): void {
    this.element.innerHTML = '';
    const currentChosenToys: string[] = getChosenToysFromStorage();
    const countOfChosenToys = currentChosenToys.length.toString();
    const countOfToys = new BaseComponent('span', ['chosen-toys__count'], countOfChosenToys);
    this.element.append(countOfToys.element);
  }
}

export default ChosenToys;
