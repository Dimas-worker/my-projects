import BaseComponent from '../../shared/base-component';
import './winner.scss';

class Winner extends BaseComponent {
  constructor() {
    super('div', ['winner', 'visible'], 'Table');
  }
}

export default Winner;
