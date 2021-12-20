import BaseComponent from '../../../utils/base-component';

class ResetLocal extends BaseComponent {
  constructor() {
    super('button', ['reset'], 'Cброс LS');
    this.element.addEventListener('click', () => {
      localStorage.clear();
    });
  }
}

export default ResetLocal;
