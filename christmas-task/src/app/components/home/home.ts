import './home.scss';
import BaseComponent from '../../utils/base-component';
import Header from '../header/header';

class MainHome extends BaseComponent {
  header: Header;

  title: BaseComponent;

  subTitle: BaseComponent;

  link: BaseComponent;

  constructor(header: Header) {
    super('div', ['main-home']);
    this.header = header;
    this.title = new BaseComponent('h1', ['main-home__title'], 'Новогодняя игра');
    this.subTitle = new BaseComponent('span', [], '«Наряди ёлку»');
    this.title.element.append(this.subTitle.element);
    this.link = new BaseComponent('a', ['main-home__button'], 'Начать');
    this.link.element.setAttribute('href', './#/toys');
    this.link.element.addEventListener('click', () => {
      const toysLink = this.header.menu.container.childNodes[1].firstChild as HTMLElement;
      toysLink.classList.add('active__link');
    });
    this.element.append(this.title.element, this.link.element);
  }
}

export default MainHome;
