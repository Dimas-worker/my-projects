import { LIST_OF_PAGES } from '../../../constants/constants';
import { ListData } from '../../../interfaces/interfaces';
import NavList from './nav-list/nav-list';
import './nav-menu.scss';

class NavMenu {
  navList: ListData[] = LIST_OF_PAGES;
  container: HTMLUListElement;
  private listLink: NavList | undefined;

  constructor() {
    this.container = document.createElement('ul');
    this.container.classList.add('nav');
    this.navList.forEach((link: ListData): void => {
      this.listLink = new NavList(link);
      this.container.append(this.listLink.list);
    });
    this.container.addEventListener('click', (e: Event): void => {
      const target = e.target as HTMLElement;
      this.container.childNodes.forEach((element: ChildNode): void => {
        if (element.firstChild) {
          const link = element.firstChild as HTMLElement;
          link.classList.remove('active__link');
        }
      });
      target.classList.add('active__link');
    });
  }
}

export default NavMenu;
