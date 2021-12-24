import NavMenu from './nav-menu/nav-menu';
import Search from './search/search';
import BaseComponent from '../../utils/base-component';
import './header.scss';
import ChosenToys from './chosen-toys/chosen-toys';

class Header extends BaseComponent {
  wrapper: BaseComponent;

  menu: NavMenu;

  search: Search;

  chosenToys: ChosenToys;

  constructor() {
    super('div', ['header']);
    this.wrapper = new BaseComponent('div', ['wrapper']);
    this.menu = new NavMenu();
    this.wrapper.element.append(this.menu.container);
    this.chosenToys = new ChosenToys();
    this.search = new Search(this.chosenToys);
    this.wrapper.element.append(this.search.element);
    this.element.append(this.wrapper.element);
  }

  updateChosenToys(): void {
    this.chosenToys.setCountToys();
  }
}

export default Header;
