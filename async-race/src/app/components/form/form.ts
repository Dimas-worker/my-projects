import './form.scss';
import BaseComponent from '../../shared/base-component';
import createInputElement from '../../utils/utils';

class Form extends BaseComponent {
  inputText: HTMLInputElement;

  inputColor: HTMLInputElement;

  submit: HTMLInputElement;

  constructor(typeForm: string) {
    super('form', ['form']);
    this.inputText = createInputElement('text', 'input-text', '', 'Car name');
    this.inputColor = createInputElement('color', 'input-color', '');
    this.submit = createInputElement('submit', 'input-submit', typeForm);

    this.setParameters();

    this.element.append(this.inputText, this.inputColor, this.submit);
  }

  setParameters(): void {
    this.submit.addEventListener('click', (e: Event): void => {
      e.preventDefault();
      console.log(this.inputText.value, this.inputColor.value);
    });
  }
}

export default Form;
