import './form.scss';
import BaseComponent from '../../shared/base-component';
import { createInputElement } from '../../utils/utils';
import { COLOR_DEFAULT } from '../../constants/constants';

class Form extends BaseComponent {
  inputText: HTMLInputElement;

  inputColor: HTMLInputElement;

  submit: HTMLInputElement;

  constructor(typeForm: string) {
    super('form', ['form']);
    this.inputText = createInputElement('text', 'input-text', '', 'Car name');
    this.inputColor = createInputElement('color', 'input-color', '');
    this.submit = createInputElement('submit', 'input-submit', typeForm);
    this.element.append(this.inputText, this.inputColor, this.submit);
  }

  cleanInputs(): void {
    this.inputText.value = '';
    this.inputColor.value = COLOR_DEFAULT;
  }

  switchActive(): void {
    this.element.classList.toggle('form-inactive');
    [...this.element.children].forEach((element: Element): void => {
      const input = element as HTMLInputElement;
      input.disabled = !input.disabled;
    });
  }
}

export default Form;
