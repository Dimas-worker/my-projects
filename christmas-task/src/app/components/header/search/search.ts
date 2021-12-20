import './search.scss';
import BaseComponent from '../../../utils/base-component';
import ChosenToys from '../chosen-toys/chosen-toys';

class Search extends BaseComponent {
  inputField: HTMLInputElement;

  choseToys: ChosenToys;

  constructor(choseToys: ChosenToys) {
    super('div', ['search']);
    this.choseToys = choseToys;
    this.inputField = document.createElement('input');
    this.inputField.classList.add('search__input');
    this.inputField.setAttribute('type', 'search');
    this.inputField.autofocus = true;
    this.inputField.setAttribute('autocomplete', 'off');
    this.inputField.setAttribute('placeholder', 'Введите название');
    this.element.append(this.inputField);
    this.element.append(this.choseToys.element);
  }
}

export default Search;
