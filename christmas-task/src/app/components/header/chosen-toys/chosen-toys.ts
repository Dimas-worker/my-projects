import BaseComponent from '../../../utils/base-component';
import './chosen-toys.scss';
import { getChoseToys } from '../../../utils/localStorage';

class ChosenToys extends BaseComponent {
  constructor() {
    super('div', ['chosen-toys']);
    this.renderCountToys();
  }

  renderCountToys() {
    this.element.innerHTML = '';
    const currentChosenToys: string[] = getChoseToys();
    const countToys = currentChosenToys.length;
    const countOfToy = new BaseComponent('span', ['count-toys'], countToys.toString());
    this.element.append(countOfToy.element);
  }
}

export default ChosenToys;
