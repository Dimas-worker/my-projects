import BaseComponent from '../../../utils/base-component';
import './chosen-toys.scss';
import { getChosenToysFromStorage } from '../../../utils/localStorage';

class ChosenToys extends BaseComponent {
  constructor() {
    super('div', ['chosen-toys']);
    this.setToysAmount();
  }

  setToysAmount(): void {
    this.element.innerHTML = '';
    const currentChosenToys: string[] = getChosenToysFromStorage();
    const chosenToysAmount: string = currentChosenToys.length.toString();
    const chosenToysAmountTag: BaseComponent = new BaseComponent('span', ['chosen-toys__count'], chosenToysAmount);
    this.element.append(chosenToysAmountTag.element);
  }
}

export default ChosenToys;
