import NavMenu from "./nav-menu/nav-menu";
import Search from "./search/search";
import BaseComponent from "../../utils/base-component";
import './header.scss';

class Header extends BaseComponent {
  menu: NavMenu;
  search: Search;

  constructor() {
    super('div', ['header']);
    this.menu = new NavMenu();
    this.element.append(this.menu.container);
    this.search = new Search();
    this.element.append(this.search.element);
  }
}

export default Header;
