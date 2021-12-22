import { LIST_OF_PAGES } from '../../../constants/constants';
import { ListData } from '../../../constants/interface';
import NavList from './nav-list/nav-list';
import './nav-menu.scss';

class NavMenu {
  navList: ListData[] = LIST_OF_PAGES;

  container: HTMLUListElement;

  private listLink: NavList | undefined;

  constructor() {
    this.container = document.createElement('ul');
    this.container.classList.add('nav');
    this.navList.forEach((link): void => {
      this.listLink = new NavList(link);
      this.container.append(this.listLink.list);
    });
  }
}

export default NavMenu;
