import './search.scss';
import BaseComponent from '../../../utils/base-component';

class Search extends BaseComponent {
  // element: HTMLElement;
  inputField: BaseComponent;
  favorite: BaseComponent;
  countOfToy: BaseComponent;
  
  constructor() {
    super('div', ['search']);
    this.inputField = new BaseComponent('input', ['search__input']);
    this.inputField.element.setAttribute('type', 'search');
    this.favorite = new BaseComponent('div', ['search__favorite']);
    this.countOfToy = new BaseComponent('span', ['count-toys'], '0');
    this.favorite.element.append(this.countOfToy.element);
    this.element.append(this.inputField.element);
    this.element.append(this.favorite.element);
  }
}

export default Search;
