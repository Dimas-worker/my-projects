import './home.scss';
import BaseComponent from '../../utils/base-component';

class MainHome extends BaseComponent {
  title: BaseComponent;

  subTitle: BaseComponent;

  link: BaseComponent;

  constructor() {
    super('div', ['main-home']);
    this.title = new BaseComponent('h1', ['main-home__title'], 'Новогодняя игра');
    this.subTitle = new BaseComponent('span', [], '«Наряди ёлку»');
    this.title.element.append(this.subTitle.element);
    this.link = new BaseComponent('a', ['main-home__button'], 'Начать');
    this.link.element.setAttribute('href', './#/toys');
    this.element.append(this.title.element, this.link.element);
  }
}

export default MainHome;
