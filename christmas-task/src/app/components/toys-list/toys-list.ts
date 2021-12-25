import './toys-list.scss';
import BaseComponent from '../../utils/base-component';

class ToysList extends BaseComponent {

  constructor() {
    super('div', ['toys-list']);
  }
}

export default ToysList;