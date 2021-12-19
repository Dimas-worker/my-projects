import { LIST_OF_PAGES, ListData } from '../../../constants/constants';
import NavList from './nav-list/nav-list';
import './nav-menu.scss';

class NavMenu {
  navList: ListData[] = LIST_OF_PAGES;
  container: HTMLUListElement;
  private listLink: NavList | undefined;

  constructor() {
    this.container = document.createElement('ul');
    this.container.classList.add('nav')
    this.navList.forEach(link => {
      this.listLink = new NavList(link);
      this.container.append(this.listLink.list)
    });
  }
}

export default NavMenu;
