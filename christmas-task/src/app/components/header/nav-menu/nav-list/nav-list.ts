import { ListData } from '../../../../constants/interfaces';
import './nav-list.scss';

class NavList {
  list: HTMLLIElement;

  link: HTMLAnchorElement;

  constructor(data: ListData) {
    this.list = document.createElement('li');
    this.list.classList.add('nav__link');
    this.link = document.createElement('a');
    this.link.href = data.hrefLink;
    if (data.text) {
      this.link.textContent = data.text;
    } else {
      this.link.classList.add(data.iconLink);
    }
    this.list.append(this.link);
  }
}

export default NavList;
