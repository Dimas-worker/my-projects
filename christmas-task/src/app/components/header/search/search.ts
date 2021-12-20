import './search.scss';
import BaseComponent from '../../../utils/base-component';
import ChosenToys from '../chosen-toys/chosen-toys';

class Search extends BaseComponent {
  inputField: BaseComponent;
  choseToys: ChosenToys;
  
  constructor(choseToys: ChosenToys) {
    super('div', ['search']);
    this.choseToys = choseToys;
    this.inputField = new BaseComponent('input', ['search__input']);
    this.inputField.element.setAttribute('type', 'search');
    this.inputField.element.autofocus = true;
    this.inputField.element.setAttribute('autocomplete', 'off');
    this.inputField.element.setAttribute('placeholder', 'Введите название');
    this.element.append(this.inputField.element);
    this.element.append(this.choseToys.element);
    document.addEventListener('click', () => {        
      this.choseToys.renderCountToys();
    })
  }
}

export default Search;
